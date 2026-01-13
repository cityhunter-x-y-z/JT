# Quick Start Guide

## Running the Resume Editor

### 1. Start the Development Server

```bash
cd resume-editor
npm run dev
```

The application will be available at: **http://localhost:3000**

### 2. Using the Editor

#### Navigation
- Use the tabs at the top to switch between sections:
  - **Header**: Your name and contact information
  - **Experience**: Work history with achievements
  - **Education**: Degree and academic information
  - **Skills**: Your technical and soft skills

#### Editing Experience
1. Click **"Add Experience"** to create a new work entry
2. Fill in:
   - Job Title
   - Company Name
   - Location
   - Start Date and End Date
3. Add achievement bullets:
   - Click **"Add Bullet Point"** to add more achievements
   - Use `**text**` to make text bold (e.g., `**increased sales by 40%**`)
   - Click the trash icon to remove bullets
4. Use the grip icon to reorder experiences (drag and drop)

#### Editing Skills
1. Type a skill in the input field
2. Press **Enter** or click the **+** button
3. Click the **X** on any skill tag to remove it

#### Preview & Export
- **Toggle Preview**: Show/hide the preview panel
- **Export PDF**: Opens print dialog to save as PDF
- **Save**: Downloads your resume data as a JSON file
- **Load**: Upload a previously saved JSON file

### 3. Tips for Best Results

✅ **Bold Important Metrics**: Use `**35% increase**` to highlight numbers and achievements

✅ **Keep Bullets Concise**: Aim for 1-2 lines per bullet point

✅ **Action Verbs**: Start bullets with strong verbs (Led, Designed, Implemented, Reduced, etc.)

✅ **Quantify Achievements**: Include numbers and percentages whenever possible

✅ **Auto-Save**: Your changes are automatically saved to your browser

### 4. Example Bullet Formatting

Instead of:
```
Worked on design systems
```

Write:
```
Implemented structured design systems using component libraries and design tokens, ensuring consistent user interface patterns across multiple applications, **reducing design inconsistencies by 35% and cutting UI review cycles by 20%**.
```

### 5. Keyboard Shortcuts

- **Enter** in skill input: Add the skill
- **Tab**: Navigate between fields
- **Ctrl/Cmd + P** (in preview mode): Print/Export PDF

### 6. Troubleshooting

**Preview not updating?**
- Make sure you've entered text in the field and clicked away or pressed Tab

**Lost your data?**
- Check browser localStorage (auto-saved)
- If you saved to JSON, use the Load button

**Print formatting looks off?**
- Use the Export PDF button instead of browser print
- Ensure your browser zoom is at 100%

## Need Help?

Check the main [README.md](./README.md) for more detailed information about features and data format.
