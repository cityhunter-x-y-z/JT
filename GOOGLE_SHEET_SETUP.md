# Google Sheet Setup Instructions

## 🎯 Quick Setup (15 minutes)

### Option 1: Create New Sheet (Recommended)

1. **Go to Google Sheets:** [sheets.google.com](https://sheets.google.com)
2. **Create new sheet** → Name it: "Job Hunt Tracker"
3. **Copy each tab below** (I've formatted them ready to paste)

---

## Tab 1: Job Tracker

**Create new sheet, rename to: "Job Tracker"**

Copy and paste this into first row:

```
ID	Date Found	Company	Job Title	Job URL	Status	Priority	Applied Date	Follow-up Date	Hiring Manager	Email	Notes	Response
```

**Set up data validation for Status column (F):**
- Click column F header
- Data → Data validation
- Criteria: List of items: `Researching, Applied, Followed Up, Phone Screen, Interview, Offer, Rejected, Not Interested`

**Set up data validation for Priority column (G):**
- Click column G header
- Data → Data validation
- Criteria: List of items: `A, B, C`

**Format:**
- Freeze first row: View → Freeze → 1 row
- Bold first row
- Auto-resize columns

---

## Tab 2: Companies Database

**Create new sheet, rename to: "Companies Database"**

Copy and paste:

```
Company	Website	LinkedIn	Design Team Lead	Email Pattern	Products	Funding Stage	Employee Count	Notes
```

---

## Tab 3: Hiring Managers

**Create new sheet, rename to: "Hiring Managers"**

Copy and paste:

```
Name	Company	Title	LinkedIn URL	Email	Contacted Date	Response	Last Follow-up	Next Action	Notes
```

**Set up data validation for Response column (G):**
- Click column G header
- Data → Data validation
- Criteria: List of items: `Pending, Responded, No Response, Auto-reply, Meeting Scheduled`

---

## Tab 4: Email Templates

**Create new sheet, rename to: "Email Templates"**

Copy and paste:

```
Template Name	Subject Line	Use Case	Variables Needed	Notes
Cold Outreach	Product Designer interested in {company}'s {product}	First contact	company_name, hiring_manager_name, specific_product, specific_aspect, job_title, achievements, portfolio_url	See email_templates/cold_outreach.txt
Follow-up	Re: Product Designer interested in {company}	5-7 days after initial	date, company_name, hiring_manager_name, specific_thing, new_detail	See email_templates/follow_up.txt
Portfolio Share	Portfolio update - {your_name}	Sharing new work	hiring_manager_name, company_name, case_study_title, case_study_link, problem, approach, result	See email_templates/portfolio_share.txt
```

---

## Tab 5: Weekly Metrics

**Create new sheet, rename to: "Weekly Metrics"**

Copy and paste:

```
Week Starting	Jobs Researched	Applications Sent	Direct Emails Sent	Responses Received	Phone Screens	Interviews	Offers	Rejections	Response Rate	Notes
```

**Add formula for Response Rate (column J):**
In cell J2, enter: `=IF(C2>0, ROUND((E2/C2)*100, 1)&"%", "0%")`
Then drag down for future rows.

**Pre-fill Week 1:**
Row 2: `2026-01-13	0	0	0	0	0	0	0	0	0%	Setup week`

---

## Tab 6: Application Sources

**Create new sheet, rename to: "Application Sources"**

Copy and paste:

```
Source	Applications	Responses	Response Rate	Interviews	Notes
LinkedIn	0	0	0%	0
Direct Email	0	0	0%	0
Company Website	0	0	0%	0
Naukri.com	0	0	0%	0
AngelList	0	0	0%	0
Instahyre	0	0	0%	0
Referral	0	0	0%	0
Other	0	0	0%	0
```

**Add formula for Response Rate (column D):**
In cell D2, enter: `=IF(B2>0, ROUND((C2/B2)*100, 1)&"%", "0%")`
Then drag down for all rows.

---

## Tab 7: Target Companies

**Create new sheet, rename to: "Target Companies"**

Copy and paste:

```
Company	Why Target	Status	Priority	Glassdoor Rating	Design Blog/Portfolio	Notes
```

**See the separate file: `BANGALORE_COMPANIES.md` for 50+ companies to add here**

---

## 🎨 Optional: Make It Pretty

1. **Color-code priorities:**
   - Select Priority A cells → Format → Conditional formatting → Custom formula: `=$G2="A"` → Red background
   - Select Priority B cells → Yellow background
   - Select Priority C cells → Green background

2. **Color-code status:**
   - Applied → Light blue
   - Interview → Green
   - Rejected → Grey
   - Offer → Dark green

3. **Freeze headers:**
   - View → Freeze → 1 row (for each sheet)

---

## 📊 How to Use Daily

### Every Time You Find a Job:
1. **Job Tracker tab** → Add new row
2. Fill in: ID (auto-increment), Date Found, Company, Job Title, Job URL
3. Status: "Researching"
4. Add research notes in Notes column

### When You Apply:
1. Update Status: "Applied"
2. Add Applied Date
3. Add Follow-up Date (7 days later)
4. Add Hiring Manager name and email

### When You Get Response:
1. Update Response column
2. Update Weekly Metrics tab
3. Update Application Sources tab

### Every Friday:
1. **Weekly Metrics tab** → Add new row with this week's stats
2. Calculate response rate
3. Plan next week

---

## 🔗 Share with Google Colab

**To connect this sheet to your Colab notebooks:**

1. **Share the sheet:**
   - Click "Share" button (top right)
   - Change to "Anyone with the link can view"
   - Copy the link

2. **Get the sheet name:**
   - Your sheet name is: "Job Hunt Tracker"
   - Use this name in the Colab notebooks

3. **In Colab notebook:**
   ```python
   SHEET_NAME = 'Job Hunt Tracker'  # Use your exact sheet name
   ```

---

## ✅ Quick Check

After setup, you should have **7 tabs:**
1. ✅ Job Tracker
2. ✅ Companies Database
3. ✅ Hiring Managers
4. ✅ Email Templates
5. ✅ Weekly Metrics
6. ✅ Application Sources
7. ✅ Target Companies

**Test it:** Add a fake job to Job Tracker tab, make sure dropdowns work.

---

## 🆘 Troubleshooting

**Dropdowns not working?**
- Re-do data validation steps
- Make sure you selected the entire column

**Formulas not calculating?**
- Check that Response Rate formula is in correct cells
- Make sure cells are formatted as "Number" not "Text"

**Can't connect to Colab?**
- Make sure sheet is shared (Anyone with link)
- Check sheet name is exactly "Job Hunt Tracker"
- Re-authenticate in Colab

---

## 📱 Mobile Access

**Google Sheets app** (iOS/Android):
- Download Google Sheets app
- Open your "Job Hunt Tracker" sheet
- You can update on the go!

**Pro tip:** After an interview, immediately update the sheet with notes while fresh.

---

## 🔄 Backup

**To backup weekly:**
1. File → Make a copy
2. Rename: "Job Hunt Tracker - Backup [DATE]"
3. Store in separate folder

**To export:**
1. File → Download → Excel (.xlsx) or CSV

---

Ready to start! Create your sheet, then move to the next file for your company list.
