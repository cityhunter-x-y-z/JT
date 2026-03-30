import asyncio
import os
from datetime import datetime
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="Geopolitical Impact Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "geopolitical_analyzer")
NEWSDATA_API_KEY = os.getenv("NEWSDATA_API_KEY", "")
EMERGENT_API_KEY = os.getenv("EMERGENT_API_KEY", "")

client: Optional[AsyncIOMotorClient] = None
db = None


@app.on_event("startup")
async def startup():
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        await client.admin.command("ping")
        print("MongoDB connected")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        db = None


@app.on_event("shutdown")
async def shutdown():
    if client:
        client.close()


EVENT_KEYWORDS = {
    "France Economic Transition 2025": "France economy budget debt",
    "Eastern Europe Conflict": "Russia Ukraine conflict 2026",
    "Middle East Tensions 2026": "Iran Israel tensions oil",
    "US-China Trade Relations": "US China tariffs trade",
    "Middle East Energy Shifts": "Middle East oil OPEC energy",
}


class AnalyzeRequest(BaseModel):
    business_description: str
    event_name: str


async def fetch_currency_rates() -> dict:
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(
                "https://api.frankfurter.app/latest?from=USD&to=INR,EUR"
            )
            data = resp.json()
            usd_inr = data.get("rates", {}).get("INR", 83.5)

        async with httpx.AsyncClient(timeout=10.0) as client:
            resp2 = await client.get(
                "https://api.frankfurter.app/latest?from=EUR&to=INR"
            )
            data2 = resp2.json()
            eur_inr = data2.get("rates", {}).get("INR", 90.2)

        return {"USD_INR": round(usd_inr, 2), "EUR_INR": round(eur_inr, 2)}
    except Exception as e:
        print(f"Currency fetch error: {e}")
        return {"USD_INR": 83.5, "EUR_INR": 90.2}


async def fetch_news(event_name: str) -> list:
    keywords = EVENT_KEYWORDS.get(event_name, event_name)
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(
                "https://newsdata.io/api/1/news",
                params={
                    "apikey": NEWSDATA_API_KEY,
                    "q": keywords,
                    "language": "en",
                    "size": 5,
                },
            )
            data = resp.json()
            results = data.get("results", [])
            headlines = []
            for article in results[:5]:
                headlines.append({
                    "title": article.get("title", ""),
                    "description": article.get("description", ""),
                    "source": article.get("source_id", ""),
                    "pubDate": article.get("pubDate", ""),
                })
            return headlines
    except Exception as e:
        print(f"News fetch error: {e}")
        return []


async def call_claude_business_analysis(
    business: str, event: str, headlines: list, currency: dict
) -> dict:
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        headline_text = "\n".join(
            [f"- {h['title']}" for h in headlines[:5] if h.get("title")]
        ) or "No recent headlines available."

        system_prompt = """You are a composed business analyst providing measured, professional assessments of geopolitical events on Indian businesses.
Use hedged language (may, could, potential, likely). Avoid catastrophic or sensationalist terms.
Treat all situations with dignity and professional restraint. Focus on actionable insights."""

        user_prompt = f"""Analyze the impact of the following global event on this Indian business:

GLOBAL EVENT: {event}
BUSINESS DESCRIPTION: {business}
CURRENT RATES: USD/INR = {currency['USD_INR']}, EUR/INR = {currency['EUR_INR']}
RECENT HEADLINES:
{headline_text}

Respond ONLY with a valid JSON object in this exact structure:
{{
  "summary_insight": "One sentence insight about the primary impact",
  "risk_factors": [
    {{"title": "Risk Factor Title", "description": "Brief description", "timeframe": "Short-term"}},
    {{"title": "Risk Factor Title", "description": "Brief description", "timeframe": "Medium-term"}},
    {{"title": "Risk Factor Title", "description": "Brief description", "timeframe": "Long-term"}},
    {{"title": "Risk Factor Title", "description": "Brief description", "timeframe": "Short-term"}},
    {{"title": "Risk Factor Title", "description": "Brief description", "timeframe": "Medium-term"}}
  ],
  "headwinds": [
    {{"title": "Challenge Title", "description": "Brief description"}},
    {{"title": "Challenge Title", "description": "Brief description"}},
    {{"title": "Challenge Title", "description": "Brief description"}}
  ],
  "opportunities": [
    {{"title": "Opportunity Title", "description": "Brief description"}},
    {{"title": "Opportunity Title", "description": "Brief description"}},
    {{"title": "Opportunity Title", "description": "Brief description"}}
  ],
  "actions": [
    {{"number": 1, "title": "Action Title", "description": "Specific action to take"}},
    {{"number": 2, "title": "Action Title", "description": "Specific action to take"}},
    {{"number": 3, "title": "Action Title", "description": "Specific action to take"}}
  ],
  "resilience_score": 7,
  "resilience_rationale": "Brief explanation of the score"
}}"""

        chat = LlmChat(
            api_key=EMERGENT_API_KEY,
            session_id=f"business-{datetime.now().timestamp()}",
            system_message=system_prompt,
        ).with_model("claude-haiku-4-5")

        response = await asyncio.to_thread(
            chat.send_message, UserMessage(text=user_prompt)
        )

        import json
        import re

        text = response if isinstance(response, str) else str(response)
        json_match = re.search(r"\{.*\}", text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        return {}
    except Exception as e:
        print(f"Claude business analysis error: {e}")
        return {}


async def call_claude_industry_map(
    business: str, event: str
) -> list:
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        system_prompt = """You are a composed business analyst. Use measured, professional language.
Provide balanced assessments across industry sectors."""

        user_prompt = f"""For the global event "{event}" and business context "{business}", assess the impact on these 10 Indian industry sectors.

Respond ONLY with a valid JSON array:
[
  {{"sector": "Information Technology", "status": "RISK", "intensity": 65, "note": "Brief note"}},
  {{"sector": "Pharmaceuticals", "status": "OPP", "intensity": 45, "note": "Brief note"}},
  {{"sector": "Manufacturing", "status": "RISK", "intensity": 70, "note": "Brief note"}},
  {{"sector": "Financial Services", "status": "NEU", "intensity": 40, "note": "Brief note"}},
  {{"sector": "Energy", "status": "RISK", "intensity": 80, "note": "Brief note"}},
  {{"sector": "Agriculture", "status": "NEU", "intensity": 30, "note": "Brief note"}},
  {{"sector": "Retail & FMCG", "status": "OPP", "intensity": 50, "note": "Brief note"}},
  {{"sector": "Automotive", "status": "RISK", "intensity": 60, "note": "Brief note"}},
  {{"sector": "Real Estate", "status": "NEU", "intensity": 35, "note": "Brief note"}},
  {{"sector": "Logistics", "status": "RISK", "intensity": 55, "note": "Brief note"}}
]

status must be exactly "RISK", "OPP", or "NEU". intensity is 0-100. Customize based on the event context."""

        chat = LlmChat(
            api_key=EMERGENT_API_KEY,
            session_id=f"industry-{datetime.now().timestamp()}",
            system_message=system_prompt,
        ).with_model("claude-haiku-4-5")

        response = await asyncio.to_thread(
            chat.send_message, UserMessage(text=user_prompt)
        )

        import json
        import re

        text = response if isinstance(response, str) else str(response)
        json_match = re.search(r"\[.*\]", text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        return []
    except Exception as e:
        print(f"Claude industry map error: {e}")
        return []


@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest):
    if not request.business_description.strip():
        raise HTTPException(status_code=400, detail="Business description required")
    if not request.event_name.strip():
        raise HTTPException(status_code=400, detail="Event name required")

    # Fetch live data
    currency_task = fetch_currency_rates()
    news_task = fetch_news(request.event_name)
    currency, news = await asyncio.gather(currency_task, news_task)

    # Run two Claude calls in parallel
    business_task = call_claude_business_analysis(
        request.business_description, request.event_name, news, currency
    )
    industry_task = call_claude_industry_map(
        request.business_description, request.event_name
    )
    analysis, industry_map = await asyncio.gather(business_task, industry_task)

    result = {
        "business_description": request.business_description,
        "event_name": request.event_name,
        "currency": currency,
        "date": datetime.now().strftime("%B %d, %Y"),
        "news_headlines": news,
        "analysis": analysis,
        "industry_map": industry_map,
        "timestamp": datetime.now().isoformat(),
    }

    # Persist to MongoDB if available
    if db is not None:
        try:
            await db.analyses.insert_one(result.copy())
        except Exception as e:
            print(f"MongoDB save error: {e}")

    # Remove MongoDB _id before returning
    result.pop("_id", None)
    return result


@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.get("/api/events")
async def get_events():
    return {
        "events": [
            {
                "name": "France Economic Transition 2025",
                "badge": None,
                "image": "france",
            },
            {
                "name": "Eastern Europe Conflict",
                "badge": None,
                "image": "eastern_europe",
            },
            {
                "name": "Middle East Tensions 2026",
                "badge": "ONGOING",
                "image": "middle_east",
            },
            {
                "name": "US-China Trade Relations",
                "badge": None,
                "image": "us_china",
            },
            {
                "name": "Middle East Energy Shifts",
                "badge": None,
                "image": "energy",
            },
        ]
    }
