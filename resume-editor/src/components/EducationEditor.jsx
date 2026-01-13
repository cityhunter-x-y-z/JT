import React from 'react';

const EducationEditor = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Education</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
        <input
          type="text"
          value={data.degree}
          onChange={(e) => handleChange('degree', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Bachelor of Architecture"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
        <input
          type="text"
          value={data.institution}
          onChange={(e) => handleChange('institution', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="University or College Name"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
          <input
            type="text"
            value={data.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2021"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Achievement / Honors</label>
        <textarea
          value={data.achievement}
          onChange={(e) => handleChange('achievement', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          rows="3"
          placeholder="Notable achievements, awards, or honors"
        />
      </div>
    </div>
  );
};

export default EducationEditor;
