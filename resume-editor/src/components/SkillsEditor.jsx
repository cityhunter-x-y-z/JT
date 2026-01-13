import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const SkillsEditor = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, idx) => idx !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Skills</h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a skill..."
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {data.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="hover:text-blue-900"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
        <p>💡 Tip: Add skills one at a time. They will appear as comma-separated in the preview.</p>
      </div>
    </div>
  );
};

export default SkillsEditor;
