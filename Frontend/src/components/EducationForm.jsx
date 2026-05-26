import React, { useEffect, useState } from 'react';
import { Info, Trash2, Plus } from 'lucide-react';

// Reusable Input Component (Taki code clean rahe)
const InputField = ({ label, placeholder, value, type = "text",onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
    />
  </div>
);

const EducationForm = ({resumeData,setResumeData}) => {
  // State to manage multiple education entries
  const [educations, setEducations] = useState(resumeData?.education || [{}]);

  // Function to add a new blank education entry
  const handleAddEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, { id: newId, degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '', coursework: '' }]);
  };
  const handleStateChange = (id, field, value) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  }

  // Function to remove an education entry
  const handleRemoveEducation = (idToRemove) => {
    setEducations(educations.filter(edu => edu.id !== idToRemove));
  };

  useEffect(()=>{
    setResumeData(prev=>({...prev,education:educations}))
  },[educations])

  return (
    <div className="space-y-6">
      {/* ATS Tip Banner */}
      <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p><strong>ATS Tip:</strong> List most recent degree first. Include GPA only if 3.5+.</p>
      </div>

      {/* Dynamic Education List */}
      <div className="space-y-6">
        {educations.map((edu, index) => (
          <div key={edu.id} className="relative border border-gray-100 bg-white p-6 rounded-2xl shadow-sm">
            
            {/* Header & Delete Button */}
            <div className="flex justify-between items-center mb-5">
              <h4 className="font-bold text-gray-900 text-base">Education #{index + 1}</h4>
              <button 
                onClick={() => handleRemoveEducation(edu.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Delete Education"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <InputField 
                  label="Degree & Major" 
                  placeholder="e.g. B.S. Computer Science" 
                  value={edu.degree}
                  onChange={(e)=>handleStateChange(edu.id, 'degree', e.target.value)}
                />
              </div>
              
              <InputField 
                label="Institution" 
                placeholder="e.g. University of California, Berkeley" 
                value={edu.institution}
                onChange={(e)=>handleStateChange(edu.id, 'institution', e.target.value)}
              />
              <InputField 
                label="Location" 
                placeholder="e.g. Berkeley, CA" 
                value={edu.location}
                onChange={(e)=>handleStateChange(edu.id, 'location', e.target.value)}
              />
              
              <InputField 
                label="Start Date" 
                placeholder="MM/YYYY" 
                value={edu.startDate}
                onChange={(e)=>handleStateChange(edu.id, 'startDate', e.target.value)}
              />
              <InputField 
                label="End Date (or Expected)" 
                placeholder="MM/YYYY" 
                value={edu.endDate}
                onChange={(e)=>handleStateChange(edu.id, 'endDate', e.target.value)}
              />
              
              <div className="md:col-span-1">
                <InputField 
                  label="GPA (optional)" 
                  placeholder="e.g. 3.8 / 4.0" 
                  value={edu.gpa}
                  onChange={(e)=>handleStateChange(edu.id, 'gpa', e.target.value)}
                />
              </div>
              <div className="hidden md:block"></div> {/* Empty space for grid alignment */}

              <div className="md:col-span-2">
                <InputField 
                  label="Relevant Coursework / Honors (optional)" 
                  placeholder="e.g. Data Structures, Algorithms · Dean's List" 
                  value={edu.coursework}
                  onChange={(e)=>handleStateChange(edu.id, 'coursework', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Education Button */}
      <button 
        onClick={handleAddEducation}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-[#25428F] font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
      >
        <Plus size={20} />
        Add Education
      </button>

    </div>
  );
};

export default EducationForm;