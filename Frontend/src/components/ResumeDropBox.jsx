import React, { useState, useRef } from 'react';
import { analyzeResume } from '../apis/axios';

const ResumeDropBox = ({setAtsData,setActiveTab}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const fileInputRef = useRef(null);

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    // Basic validation for allowed file types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.type) || file.name.match(/\.(pdf|doc|docx)$/i)) {
      setSelectedFile(file);
    } else {
      alert("Please upload a .PDF, .DOC, or .DOCX file.");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };


  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoadingBtn(true);

    // FormData object banana api me bhejne ke liye
    const formData = new FormData();
    // Dhyan de: 'resume' wo field name hai jo aapka backend multer me expect kar raha hoga (e.g., upload.single('resume'))
    formData.append('resume', selectedFile); 

    // Success function jo API call success hone pe chalega
    const successFunction = (data) => {
      setAtsData(data); // ATS score data set karna
      setActiveTab('score'); // Page ko 'score' par switch karna
    };

    // API function call karna
    await analyzeResume(formData, successFunction);
    
    // API call complete hone ke baad loading false karna (chahe success ho ya error)
    setLoadingBtn(false);
  };

  return (
    <div className="w-full container m-auto flex items-center justify-center p-2 sm:p-6  text-gray-800">
      <div className="bg-white rounded-[2rem] flex flex-col items-center p-5 sm:p-8 md:p-12 max-w-3xl w-full shadow-2xl">

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="sm:text-3xl text-2xl font-bold text-[#111827] mb-2">Check Your ATS Score</h2>
          <p className="text-gray-500 text-sm sm:text-lg">
            Upload your resume and get a detailed ATS compatibility report instantly.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`w-full max-w-[500px] border-2 border-dashed rounded-3xl p-4 sm:p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 mb-4
            ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-blue-400 hover:bg-gray-50 bg-white'
            }`}
        >
          {selectedFile ? (
            <div className="w-full flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold w-full min-w-0  truncate text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                className="mt-4 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove File
              </button>
            </div>
          ) : (
            <>
              {/* Upload Icon */}
              <div className="bg-blue-50/50 sm:p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>

              <h3 className="text-md sm:text-xl text-center font-semibold text-gray-900 mb-2">Drag & drop your resume</h3>
              <p className="text-gray-500 text-sm mb-6">or click to browse your files</p>

              {/* File Format Pills */}
              <div className="flex gap-3">
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium rounded-full">.PDF</span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium rounded-full">.DOC</span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm font-medium rounded-full">.DOCX</span>
              </div>
            </>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
        />

        {/* Demo Link */}
        {/* <div className="text-center mb-6">
          <span className="text-gray-500">Don't have a resume handy? </span>
          <a href="#" className="text-blue-600 font-semibold hover:underline">Use a demo file</a>
        </div> */}

        {/* Submit Button */}
        <button
        onClick={handleUpload}
          disabled={!selectedFile || loadingBtn}
          className={`w-full py-4 rounded-xl text-md sm:text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 mb-4
            ${selectedFile
              ? 'bg-[#5C75C5] hover:bg-[#4a61a8] text-white shadow-md cursor-pointer'
              : 'bg-[#9BA9D4] text-white cursor-not-allowed'
            }`}
        >
          {loadingBtn ? <>
            <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
             Uploading Resume
          </> :
            <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
              Check My ATS Score
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg></>}
        </button>

        {/* Helper Text */}
        <p className="text-center w-full text-gray-500 text-sm mb-8 pb-8 border-b border-gray-200">
          {selectedFile ? 'Ready for analysis' : 'Upload your resume above to enable analysis'}
        </p>

        {/* Footer Stats */}
        <div className="w-full flex justify-between items-center px-4 md:px-12 text-center">
          <div>
            <p className="text-xl font-bold text-gray-900 mb-1">Free</p>
            <p className="text-gray-500 text-sm">Always free</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 mb-1">&lt; 30s</p>
            <p className="text-gray-500 text-sm">Analysis time</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 mb-1">98%</p>
            <p className="text-gray-500 text-sm">Accuracy rate</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeDropBox;