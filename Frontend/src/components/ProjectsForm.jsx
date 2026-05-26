import React, { useEffect, useState } from 'react';
import { Info, Trash2, Plus } from 'lucide-react';

// Reusable Input Component
const InputField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input 
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
    />
  </div>
);

// Reusable Textarea Component
const TextAreaField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <textarea 
      rows="3"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
    />
  </div>
);

const ProjectsForm = ({resumeData, setResumeData}) => {
  // State management with default projects initialized
  const [projects, setProjects] = useState(resumeData?.projects || [
  ]);
 useEffect(()=>{
    setResumeData(prev=>({
      ...prev,
      "projects":projects
    }))
  },[projects])

  // --- Handlers ---
  const handleAddProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { 
      id: newId, projectName: '', link: '', techStack: '', description: '' 
    }]);
  };

  const handleRemoveProject = (idToRemove) => {
    setProjects(projects.filter(project => project.id !== idToRemove));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  return (
    <div className="space-y-6">
      
      {/* ATS Tip Banner */}
      <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p><strong>ATS Tip:</strong> Include GitHub links and tech stack. Projects add 2+ ATS points.</p>
      </div>

      {/* Dynamic Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="relative border border-gray-100 bg-white p-6 rounded-2xl shadow-sm">
            
            {/* Header & Delete Button */}
            <div className="flex justify-between items-center mb-5">
              <h4 className="font-bold text-gray-900 text-base">Project #{index + 1}</h4>
              <button 
                onClick={() => handleRemoveProject(project.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Delete Project"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField 
                label="Project Name" 
                placeholder="e.g. ResumeParser CLI" 
                value={project.projectName}
                onChange={(e) => handleProjectChange(project.id, 'projectName', e.target.value)}
              />
              <InputField 
                label="GitHub / Live Link" 
                placeholder="e.g. github.com/sarahchen/resumeparser" 
                value={project.link}
                onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
              />
              
              <div className="md:col-span-2">
                <InputField 
                  label="Tech Stack" 
                  placeholder="e.g. Python, FastAPI, PostgreSQL" 
                  value={project.techStack}
                  onChange={(e) => handleProjectChange(project.id, 'techStack', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <TextAreaField 
                  label="Description" 
                  placeholder="e.g. Built a CLI tool that parses resumes and scores them against ATS criteria..." 
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Add Project Button */}
      <button 
        onClick={handleAddProject}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-[#25428F] font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
      >
        <Plus size={20} />
        Add Project
      </button>

    </div>
  );
};

export default ProjectsForm;