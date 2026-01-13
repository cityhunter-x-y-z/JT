import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const ExperienceEditor = ({ data, onChange }) => {
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "New Position",
      company: "Company Name",
      location: "City",
      startDate: "Month Year",
      endDate: "Month Year",
      bullets: ["Achievement or responsibility"]
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id, field, value) => {
    onChange(data.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const deleteExperience = (id) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const addBullet = (id) => {
    onChange(data.map(exp =>
      exp.id === id ? { ...exp, bullets: [...exp.bullets, "New achievement"] } : exp
    ));
  };

  const updateBullet = (expId, bulletIndex, value) => {
    onChange(data.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const deleteBullet = (expId, bulletIndex) => {
    onChange(data.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIndex) };
      }
      return exp;
    }));
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {data.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex items-start gap-2">
            <GripVertical size={20} className="text-gray-400 mt-2 cursor-move" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title"
                />
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Location"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Start Date"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="End Date"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Achievements & Responsibilities
                </label>
                {exp.bullets.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="flex gap-2">
                    <textarea
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, bulletIdx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      rows="2"
                      placeholder="Describe your achievement (use **text** for bold)"
                    />
                    <button
                      onClick={() => deleteBullet(exp.id, bulletIdx)}
                      className="px-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addBullet(exp.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus size={14} /> Add Bullet Point
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceEditor;
