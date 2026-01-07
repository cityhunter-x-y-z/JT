# Job Search Strategy: Smart Semi-Automation for Product Designers

## 🎯 The Problem with Your Current Approach

**Why Easy Apply + Auto-reject Cycle Happens:**
1. Easy Apply = Generic applications (1000s of applicants)
2. No personalization = ATS (Applicant Tracking System) rejects you
3. No networking = You're just a resume in a pile
4. Spray and pray = Low quality signals to companies

**Auto-apply & scraping issues:**
- LinkedIn ToS violation → Account ban
- Auto-apply → Platform bans
- Mass emails → Spam folder + reputation damage
- Illegal in some cases (data scraping laws)

---

## ✨ Refined Strategy: Quality Over Quantity

### Phase 1: Build Your Job Intelligence Dashboard
**Goal:** Track opportunities, not just apply blindly

**Tools:**
- Google Sheets (Job Tracker)
- Google Colab (Data processing & email templates)
- Gmail (Manual sending with templates)
- Browser extensions (optional helpers)

### Phase 2: Smart Job Discovery
**Instead of scraping, use:**
1. **Job Aggregators (Manual but Efficient):**
   - LinkedIn Jobs (manual search, save good ones)
   - Naukri.com (Product Designer, Bangalore)
   - AngelList/Wellfound (Startups)
   - Instahyre (Tech jobs India)
   - Cutshort.io
   - Razorpay Capital Jobs, Swiggy Careers, etc.

2. **What to Track in Sheets:**
   - Company Name
   - Job Title
   - Job URL
   - Date Found
   - Application Status
   - Hiring Manager (to research)
   - Company LinkedIn
   - Notes (why you're good fit)
   - Priority (A/B/C)
   - Follow-up Date

### Phase 3: Research > Auto-apply
**For each job (focus on 5-10 per week, not 100):**

1. **Company Research (15 mins):**
   - What do they build?
   - Recent news/funding?
   - Design philosophy?
   - Team size?

2. **Find Hiring Manager (Manual, LinkedIn):**
   - Search: "[Company] design manager" on LinkedIn
   - Search: "[Company] hiring" + filter by company
   - Check company's design team page
   - Use LinkedIn's "People" tab on company page
   - **Don't scrape - manually note down names**

3. **Craft Personalized Application:**
   - Reference specific company projects
   - Show you understand their product
   - Highlight relevant portfolio work
   - Custom cover letter (template-based, but personalized)

### Phase 4: Email Outreach (Semi-automated)
**Template system, manual sending:**

1. **Email Templates in Colab/Sheets:**
   - Introduction template
   - Follow-up template
   - Portfolio highlight template
   - **Variables:** {name}, {company}, {specific_project}, {your_skill}

2. **Find Email Addresses (Ethical ways):**
   - Check company website "Team" page
   - Use Hunter.io (free tier: 25 searches/month)
   - Use RocketReach (free tier: 10/month)
   - LinkedIn About section (sometimes listed)
   - Company email pattern (firstname@company.com)
   - **Never scrape - use legitimate tools**

3. **Manual Sending (Critical):**
   - Copy template → Personalize → Send from Gmail
   - Track in sheets: Email sent date, response date
   - Follow-up after 5-7 days if no response
   - Max 2 follow-ups, then move on

### Phase 5: Portfolio & Profile Optimization
**While tracking jobs:**

1. **LinkedIn Profile:**
   - Headline: "Product Designer | [Your Specialty] | [Top Skills]"
   - About section: Problem you solve, not just experience
   - Featured section: Best 3-4 projects with case studies
   - Activity: Share design insights (1-2 posts/week)

2. **Portfolio:**
   - Case studies > Pretty pictures
   - Show: Problem → Process → Solution → Impact
   - Quantify results where possible
   - Mobile-friendly, fast loading

3. **Resume:**
   - ATS-friendly format (simple, not overly designed)
   - Keywords from job description
   - Metrics: "Improved X by Y%", "Led design for Z users"

---

## 🛠️ System Architecture

### Google Sheets Structure
```
Sheet 1: Job Tracker
- Columns: ID, Date, Company, Role, URL, Status, Priority, Applied Date,
  Follow-up Date, Hiring Manager, Email, Notes

Sheet 2: Companies Database
- Columns: Company, Website, LinkedIn, Design Team Lead, Email Pattern,
  Products, Notes

Sheet 3: Hiring Managers
- Columns: Name, Company, Title, LinkedIn URL, Email, Contacted Date,
  Response, Notes

Sheet 4: Email Templates
- Columns: Template Name, Subject Line, Body, Use Case, Variables

Sheet 5: Application Metrics
- Weekly stats: Applications sent, Responses, Interviews, Rejections
- Conversion rates
- What's working/not working
```

### Google Colab Notebooks
```
Notebook 1: Job Data Organizer
- Import data from sheets
- Categorize by priority
- Generate weekly application plan
- Set reminders for follow-ups

Notebook 2: Email Template Generator
- Load templates from sheets
- Fill in variables
- Generate personalized emails
- Copy to clipboard (you paste & send)

Notebook 3: Portfolio Analytics (Optional)
- Track portfolio views
- Track application sources
- Analyze what's working

Notebook 4: Company Research Helper
- Input: Company name
- Output: Quick research summary (from public sources)
- LinkedIn company page summary
- Recent news (via Google News API)
```

---

## 📋 Step-by-Step Execution Plan

### Week 1: Setup
- [ ] Create Google Sheet with structure above
- [ ] Set up Gmail labels (Job Search, Applied, Interviewing, etc.)
- [ ] Optimize LinkedIn profile
- [ ] Create 3-4 email templates
- [ ] List 50 target companies in Bangalore

### Week 2-4: Systematic Application
**Daily (1-2 hours):**
1. Find 3-5 quality jobs (spend 20 mins researching each)
2. Add to tracker with research notes
3. Find hiring manager for top 2 jobs
4. Customize resume for 1-2 applications
5. Send 1-2 applications + direct emails

**Weekly:**
- Review metrics: What's working?
- Adjust approach based on response rate
- Network on LinkedIn (comment, engage, don't spam DM)

### Week 4+: Optimize
- If response rate < 5%: Fix resume/portfolio
- If response rate 5-15%: Keep going, refine messaging
- If response rate > 15%: Scale up (but stay quality-focused)

---

## 🚫 What NOT to Do

1. **Don't:** Auto-apply to 100s of jobs
   **Do:** Apply to 20-30 carefully selected jobs

2. **Don't:** Scrape LinkedIn
   **Do:** Manual research, use legitimate tools

3. **Don't:** Send mass auto-emails
   **Do:** Send personalized emails (template-based)

4. **Don't:** Use Easy Apply exclusively
   **Do:** Direct applications + email to hiring manager

5. **Don't:** Apply & forget
   **Do:** Track, follow-up strategically

---

## 🎯 Success Metrics

**Track these weekly:**
- Jobs researched: 10-15
- Quality applications sent: 5-10
- Direct outreach emails: 3-5
- Response rate: Aim for 10-20%
- Phone screens: Aim for 1-2/week
- Portfolio views: Track increase

**Quality > Quantity:**
- 10 personalized applications > 100 Easy Apply
- 5 hiring manager emails > 50 generic applications
- 1 referral > 10 cold applications

---

## 💪 Why This Works

1. **Personalization:** You stand out from Easy Apply crowd
2. **Direct outreach:** Bypass ATS, reach decision makers
3. **Research-based:** Shows genuine interest
4. **Trackable:** You know what works, iterate
5. **Sustainable:** 1-2 hours/day, not burnout
6. **Legal & Ethical:** No ToS violations
7. **Professional:** Builds reputation, not damages it

---

## 🔧 Tools for Browser-Only Workflow

**Free/Freemium Tools:**
1. **Google Sheets** - Job tracking
2. **Google Colab** - Data processing, templates
3. **Gmail** - Email sending
4. **Hunter.io** - Email finding (25/month free)
5. **LinkedIn** - Manual research (don't scrape!)
6. **Calendly** - Easy interview scheduling
7. **Notion** (optional) - More advanced tracking

**Chrome Extensions (Optional):**
- Save to Google Sheets extension
- LinkedIn Sales Navigator (free trial)
- Tango (for creating process docs)

---

## 📧 Next Steps

1. Review this strategy
2. Let me know if you want me to:
   - Create the Google Sheets template structure
   - Build the Colab notebooks for templates/organization
   - Create email templates specific to Product Design roles
   - Set up the tracking system
   - Provide portfolio review checklist

**Remember:** The goal is interviews, not application volume. Quality wins.
