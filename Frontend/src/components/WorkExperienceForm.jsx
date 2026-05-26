import React, { useState } from 'react';
import { Info, Trash2, Plus } from 'lucide-react';

// Reusable Input Component
const InputField = ({ label, placeholder, value, onChange, disabled, type = "text" }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`text-sm font-semibold ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 
        ${disabled 
          ? 'bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-blue-500 placeholder:text-gray-400'
        }`}
    />
  </div>
);

const WorkExperienceForm = () => {
  // Initial state with one empty experience block (matching your UI screenshot data for preview)
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'Acme Technologies Inc.',
      location: 'San Francisco, CA (Remote)',
      startDate: '03/2022',
      endDate: '05/2024',
      isCurrent: false,
      bullets: ['']
    }
  ]);

  // --- Experience Block Handlers ---
  const handleAddExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences([...experiences, { 
      id: newId, jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, bullets: [''] 
    }]);
  };

  const handleRemoveExperience = (idToRemove) => {
    setExperiences(experiences.filter(exp => exp.id !== idToRemove));
  };

  const handleExpChange = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  // --- Bullet Point Handlers ---
  const handleAddBullet = (expId) => {
    setExperiences(experiences.map(exp => 
      exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
    ));
  };

  const handleRemoveBullet = (expId, bulletIndex) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = exp.bullets.filter((_, index) => index !== bulletIndex);
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const handleBulletChange = (expId, bulletIndex, value) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  return (
    <div className="space-y-6">
      {/* ATS Tip Banner */}
      <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p><strong>ATS Tip:</strong> Start each bullet with a strong action verb. Add metrics where possible.</p>
      </div>

      {/* Dynamic Experience List */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative border border-gray-100 bg-white p-6 rounded-2xl shadow-sm">
            
            {/* Header & Delete Button */}
            <div className="flex justify-between items-center mb-5">
              <h4 className="font-bold text-gray-900 text-base">Position #{index + 1}</h4>
              <button 
                onClick={() => handleRemoveExperience(exp.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Delete Position"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <InputField 
                label="Job Title" 
                placeholder="e.g. Senior Software Engineer" 
                value={exp.jobTitle}
                onChange={(e) => handleExpChange(exp.id, 'jobTitle', e.target.value)}
              />
              <InputField 
                label="Company" 
                placeholder="e.g. Acme Technologies Inc." 
                value={exp.company}
                onChange={(e) => handleExpChange(exp.id, 'company', e.target.value)}
              />
              <InputField 
                label="Location" 
                placeholder="e.g. San Francisco, CA (Remote)" 
                value={exp.location}
                onChange={(e) => handleExpChange(exp.id, 'location', e.target.value)}
              />
              <InputField 
                label="Start Date" 
                placeholder="MM/YYYY" 
                value={exp.startDate}
                onChange={(e) => handleExpChange(exp.id, 'startDate', e.target.value)}
              />
              
              <div className="flex flex-col gap-1.5">
                <InputField 
                  label="End Date" 
                  placeholder={exp.isCurrent ? "Present" : "MM/YYYY"} 
                  value={exp.isCurrent ? "" : exp.endDate}
                  onChange={(e) => handleExpChange(exp.id, 'endDate', e.target.value)}
                  disabled={exp.isCurrent}
                />
                
                {/* Current Job Checkbox */}
                <label className="flex items-center gap-2 mt-2 cursor-pointer group w-fit">
                  <input 
                    type="checkbox" 
                    checked={exp.isCurrent}
                    onChange={(e) => handleExpChange(exp.id, 'isCurrent', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    I currently work here
                  </span>
                </label>
              </div>
            </div>

            {/* Responsibility Bullets Section */}
            <div className="border-t border-gray-100 pt-5 mt-2">
              <div className="mb-3">
                <h5 className="text-sm font-semibold text-gray-700">Responsibility Bullets</h5>
                <p className="text-xs text-gray-500">Start each with an action verb. Add metrics (%, $, ms, users) for higher ATS scores.</p>
              </div>
              
              <div className="space-y-3">
                {exp.bullets.map((bullet, bIndex) => (
                  <div key={bIndex} className="flex items-start gap-3 group">
                    <div className="mt-3.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                    <div className="flex-1 relative">
                      <textarea
                        rows="2"
                        value={bullet}
                        onChange={(e) => handleBulletChange(exp.id, bIndex, e.target.value)}
                        placeholder="e.g. Engineered a real-time notification system serving 200K+ users, reducing latency by 35%"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    <button 
                      onClick={() => handleRemoveBullet(exp.id, bIndex)}
                      className="mt-2.5 text-gray-400 hover:text-red-500 transition-colors p-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Remove bullet"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Bullet Button */}
              <button 
                onClick={() => handleAddBullet(exp.id)}
                className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors px-2 py-1"
              >
                <Plus size={16} />
                Add bullet point
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add Experience Button */}
      <button 
        onClick={handleAddExperience}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-[#25428F] font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
      >
        <Plus size={20} />
        Add Work Experience
      </button>

    </div>
  );
};

export default WorkExperienceForm;