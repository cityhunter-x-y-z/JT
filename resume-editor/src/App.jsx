import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Upload, Save, Eye, Edit3 } from 'lucide-react';
import ResumePreview from './components/ResumePreview';
import HeaderEditor from './components/HeaderEditor';
import ExperienceEditor from './components/ExperienceEditor';
import EducationEditor from './components/EducationEditor';
import SkillsEditor from './components/SkillsEditor';
import { initialResumeData } from './data/initialResumeData';

function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialResumeData;
  });
  const [activeTab, setActiveTab] = useState('header');
  const [showPreview, setShowPreview] = useState(true);
  const resumeRef = useRef();

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.header.name}_Resume`,
  });

  const saveToFile = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.header.name.replace(/\s+/g, '_')}_resume.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setResumeData(data);
          alert('Resume loaded successfully!');
        } catch (error) {
          alert('Error loading file. Please ensure it is a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'header', label: 'Header', icon: Edit3 },
    { id: 'experience', label: 'Experience', icon: Edit3 },
    { id: 'education', label: 'Education', icon: Edit3 },
    { id: 'skills', label: 'Skills', icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <Eye size={18} />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer">
                <Upload size={18} />
                Load
                <input
                  type="file"
                  accept=".json"
                  onChange={loadFromFile}
                  className="hidden"
                />
              </label>
              <button
                onClick={saveToFile}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Download size={18} />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {/* Editor Panel */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow p-2">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Content */}
            <div className="min-h-[600px]">
              {activeTab === 'header' && (
                <HeaderEditor
                  data={resumeData.header}
                  onChange={(header) => setResumeData({ ...resumeData, header })}
                />
              )}
              {activeTab === 'experience' && (
                <ExperienceEditor
                  data={resumeData.experience}
                  onChange={(experience) => setResumeData({ ...resumeData, experience })}
                />
              )}
              {activeTab === 'education' && (
                <EducationEditor
                  data={resumeData.education}
                  onChange={(education) => setResumeData({ ...resumeData, education })}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsEditor
                  data={resumeData.skills}
                  onChange={(skills) => setResumeData({ ...resumeData, skills })}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="sticky top-6 h-fit">
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg overflow-auto max-h-[calc(100vh-120px)]">
                <ResumePreview ref={resumeRef} data={resumeData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
