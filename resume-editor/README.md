# Resume Editor

A modern, React-based resume editor with real-time preview, similar to resumai.com. This application allows you to create and edit professional resumes with a clean, ATS-friendly format.

## Features

- **Real-time Preview**: See your changes instantly as you edit
- **Professional Format**: Clean, ATS-optimized resume layout
- **Easy Editing**: Intuitive interface with tabbed sections
- **PDF Export**: Print or save your resume as PDF
- **Save/Load**: Export and import your resume data as JSON
- **Auto-save**: Your changes are automatically saved to browser storage
- **Responsive Design**: Works on desktop and tablet devices

## Sections

- **Header**: Name, contact information, location, email, phone, LinkedIn, website
- **Experience**: Multiple work experiences with titles, companies, dates, and achievement bullets
- **Education**: Degree, institution, location, year, and achievements
- **Skills**: Tag-based skill management

## Getting Started

### Installation

```bash
cd resume-editor
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Edit Your Resume**: Use the tabs to navigate between different sections (Header, Experience, Education, Skills)
2. **Real-time Preview**: Your changes appear instantly in the preview panel on the right
3. **Add/Remove Items**:
   - Click "Add Experience" to add new work experiences
   - Use the trash icon to remove items
   - Add/remove bullet points for each experience
   - Add/remove skills with the skill editor
4. **Export Options**:
   - **Export PDF**: Click to print or save as PDF
   - **Save**: Download your resume data as a JSON file
   - **Load**: Import a previously saved JSON file
5. **Bold Text**: In bullet points, use `**text**` to make text bold (e.g., `**reduced costs by 30%**`)

## Data Format

Your resume data is stored in JSON format and can be exported/imported. The auto-save feature stores your data in browser localStorage.

## Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **react-to-print**: PDF export functionality
- **lucide-react**: Icons

## Tips

- Use the bold formatting `**text**` in achievement bullets to highlight metrics and key results
- Keep bullet points concise and achievement-focused
- The preview shows exactly how your resume will look when printed/exported
- Your data is auto-saved, but use the Save button to create backups

## License

MIT
