import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1e] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Description Column */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            
            <h1 className="text-xl sm:text-2xl font-bold " style={{
                    fontFamily:'Cedarville Cursive'
                }}>
                    <span className="text-white">ATS</span>
                    <span className="text-blue-800">Resume</span>
                    <span className="text-white">AI</span>
                </h1>
          </div>
          <p className="text-gray-400 max-w-sm">
            Beat the bots. Land the interview. Our AI-powered ATS analyzer 
            helps job seekers craft resumes that pass automated filters 
            and impress recruiters.
          </p>
        </div>

        {/* Product Column */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">PRODUCT</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/analyzer" className="hover:text-blue-400">ATS Analyzer</a></li>
            <li><a href="/builder" className="hover:text-blue-400">Resume Builder</a></li>
            <li><a href="/analyzer" className="hover:text-blue-400">Score Dashboard</a></li>
            <li><a href="/builder" className="hover:text-blue-400">Templates</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">COMPANY</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2026 ATSResumeAI. All rights reserved.</p>
        <p>Helping 50,000+ job seekers get hired</p>
      </div>
    </footer>
  );
};

export default Footer;