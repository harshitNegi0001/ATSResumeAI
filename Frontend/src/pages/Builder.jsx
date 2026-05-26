import React, { useState, useRef } from 'react';
// Naye hooks aur icons import kiye (useRef, useReactToPrint, ArrowLeft, Download)
import { useReactToPrint } from 'react-to-print';
import { FileText, User, GraduationCap, Briefcase, Code, FolderGit2, ArrowLeft, Download } from 'lucide-react';
import TemplateSelector from '../components/TemplateSelector';
import Accordion from '../components/Accordion';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import EducationForm from '../components/EducationForm';
import CompletionTracker from '../components/CompletionTracker';
import WorkExperienceForm from '../components/WorkExperienceForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { defaultResumeData } from '../utils/defaultResumeData';
import { generateResume } from '../apis/axios';
import ResumePreview from '../components/ResumePreview';

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [openSection, setOpenSection] = useState('personal');
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [activeTab, setActiveTab] = useState('build');
  const [previewData, setPreviewData] = useState(null);

  // 1. PDF generation ke liye Reference
  const componentRef = useRef();

  // 2. Syntax update kar do:
  const handleDownload = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${previewData?.personal_information?.full_name || 'My'}_Resume`,
    pageStyle: `
      @page { 
        size: A4; 
        margin: 0; /* Default margin zero hi rakho for blue header */
      }
      @media print { 
        body { 
          -webkit-print-color-adjust: exact; 
        }
        /* Agar content 2 page par jata hai, toh sections ko katne se roko */
        section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        /* Ye trick page 2 ke top par zaroori gap bana degi */
        .px-10.py-5 {
           padding-bottom: 20mm; /* Bottom me buffer tak ki text naturally break ho */
        }
      }
    `
  });

  const handleToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleBuildResume = async () => {
    function successFunction(data) {
      setPreviewData(data);
      setActiveTab('preview');
    }
    setLoadingBtn(true);
    await generateResume(resumeData, successFunction);
    setLoadingBtn(false);
  }

  return (
    <div className="w-full mt-12 bg-gray-50 py-8 px-4 text-gray-800 min-h-screen">

      {/* ======================= BUILD TAB ======================= */}
      {activeTab === 'build' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-sm text-gray-500">Build an ATS-optimized resume from scratch</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              ATS-Optimized Templates
            </div>
          </div>

          {/* Template Selector Component */}
          <TemplateSelector
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
          />

          {/* Accordion Sections */}
          <div className="space-y-3">
            <Accordion
              id="personal" title="Personal Details" subtitle="Click to expand"
              icon={User} isOpen={openSection === 'personal'} onToggle={() => handleToggle('personal')}
            >
              <PersonalDetailsForm resumeData={resumeData} setResumeData={setResumeData} />
            </Accordion>

            <Accordion
              id="education" title="Education" subtitle="Click to expand"
              icon={GraduationCap} isOpen={openSection === 'education'} onToggle={() => handleToggle('education')}
            >
              <EducationForm resumeData={resumeData} setResumeData={setResumeData} />
            </Accordion>

            <Accordion
              id="experience" title="Work Experience" subtitle="Click to expand"
              icon={Briefcase} isOpen={openSection === 'experience'} onToggle={() => handleToggle('experience')}
            >
              <WorkExperienceForm resumeData={resumeData} setResumeData={setResumeData} />
            </Accordion>

            <Accordion
              id="skills" title="Skills" subtitle="Click to expand"
              icon={Code} isOpen={openSection === 'skills'} onToggle={() => handleToggle('skills')}
            >
              <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
            </Accordion>

            <Accordion
              id="projects" title="Projects" subtitle="Click to expand"
              icon={FolderGit2} isOpen={openSection === 'projects'} onToggle={() => handleToggle('projects')}
            >
              <ProjectsForm resumeData={resumeData} setResumeData={setResumeData} />
            </Accordion>
          </div>

          {/* Generate Action Bar */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">Ready to generate?</h3>
              <p className="text-sm text-gray-500">Your resume will be formatted and ATS-optimized instantly.</p>
            </div>
            <button
              onClick={handleBuildResume}
              disabled={loadingBtn}
              className={`${loadingBtn ? 'bg-blue-700/50 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors`}
            >
              {loadingBtn ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating
                </>
              ) : (
                <>
                  <FaWandMagicSparkles size={18} />
                  Generate Resume
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ======================= PREVIEW TAB ======================= */}
      {activeTab === 'preview' && (
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Action Bar for Preview (Back & Download) */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4 z-10">
            <button
              onClick={() => setActiveTab('build')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              <ArrowLeft size={18} /> Back to Edit
            </button>
            <button
              onClick={handleDownload}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download size={18} /> Download PDF
            </button>
          </div>

          {/* The Resume Preview Wrapper (Mobile Scaled + Print Target) */}
          {/* Ye wrapper dark background deta hai jisse white A4 page pop hoke dikhta hai */}
          <div className="w-full flex justify-center overflow-x-auto bg-gray-200/50 p-4 sm:p-8 rounded-xl shadow-inner">

            {/* Mobile par 45%, Tablet par 70%, aur Large Screen par 100% scale */}
            <div className="transform scale-[0.35] sm:scale-[0.7] lg:scale-100 origin-top print:scale-100 transition-transform">

              {/* Is div par ref laga hai, yani yahi exact hissa PDF me jayega */}
              <div ref={componentRef}>
                <ResumePreview resumeData={previewData} />
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;