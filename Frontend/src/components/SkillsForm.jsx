import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';

// Specialized Input Component for Skills
const SkillInputField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <div className="mb-0.5">
      <label className="text-sm font-semibold text-gray-700 block">{label}</label>
      <span className="text-xs text-gray-400">Comma-separated list</span>
    </div>
    <input 
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
    />
  </div>
);

const SkillsForm = ({resumeData, setResumeData}) => {
  // State management for all skill categories
  const [skills, setSkills] = useState(resumeData?.skills||{});

  // Generic handler to update specific skill category
  const handleChange = (category, value) => {
    setSkills(prev => ({
      ...prev,
      [category]: value
    }));
  };
  useEffect(()=>{
    setResumeData(prev=>({
      ...prev,
      "skills":skills
    }))
  },[skills])

  return (
    <div className="space-y-6">
      
      {/* ATS Tip Banner */}
      <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p><strong>ATS Tip:</strong> Use comma-separated keywords. ATS parsers match exact keyword strings.</p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        
        <SkillInputField 
          label="Programming Languages" 
          placeholder="e.g. JavaScript, Python, Java"
          value={skills.languages}
          onChange={(e) => handleChange('languages', e.target.value)}
        />
        
        <SkillInputField 
          label="Frameworks & Libraries" 
          placeholder="e.g. React, Node.js, Express"
          value={skills.frameworks}
          onChange={(e) => handleChange('frameworks', e.target.value)}
        />
        
        <SkillInputField 
          label="Tools & Platforms" 
          placeholder="e.g. Git, Docker, Jira, Figma"
          value={skills.tools}
          onChange={(e) => handleChange('tools', e.target.value)}
        />
        
        <SkillInputField 
          label="Databases" 
          placeholder="e.g. PostgreSQL, MongoDB, Redis"
          value={skills.databases}
          onChange={(e) => handleChange('databases', e.target.value)}
        />
        
        <SkillInputField 
          label="Cloud & DevOps" 
          placeholder="e.g. AWS (EC2, S3), Kubernetes"
          value={skills.cloudDevops}
          onChange={(e) => handleChange('cloudDevops', e.target.value)}
        />
        
        <SkillInputField 
          label="Soft Skills" 
          placeholder="e.g. Technical Leadership, Communication"
          value={skills.softSkills}
          onChange={(e) => handleChange('softSkills', e.target.value)}
        />
        
      </div>
    </div>
  );
};

export default SkillsForm;