


import  { useState, useEffect } from 'react';

import {
    LuFileText,
    LuRefreshCw,
    LuShare2,
    LuDownload,
    LuCircleCheck,
    LuTriangleAlert,
    LuTrendingUp,
    LuAward
} from 'react-icons/lu';
import { formatDate } from '../utils/date';
import ScoreTab from './ScoreTab';
import KeywordsTab from './KeywordsTab';
import SuggestionTab from './SuggestionTab';
import ActionsTab from './ActionsTab';

// --- Reusable Stat Card Component ---


// --- Main Component ---
const AtsAnalysisReport = ({setActiveTab,atsData}) => {
  // Mock Data (Ye data aap API se aane wale setAtsScoreData props se replace kar sakte hain)

  // Score Animation State
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeOption,setActiveOption] = useState('score');

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds animation
    const increment = atsData.ats_score / (duration / 16); // 60fps calculation
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= atsData.ats_score) {
        setAnimatedScore(atsData.ats_score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [atsData.ats_score]);

  // Calculate SVG stroke offset for the gauge chart (251 is approx max circumference for this semi-circle arc)
  const maxDashOffset = 251;
  const currentOffset = maxDashOffset - (maxDashOffset * (animatedScore / 100));

  return (
    <div className="w-full  p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
              <LuFileText size={16} />
              <span>Analyzed file:</span>
              <span className="font-medium text-gray-900 truncate max-w-[200px] md:max-w-md">
                {atsData.fileName}
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-medium border border-emerald-100">
                Analyzed
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">ATS Analysis Report</h1>
            <p className="text-sm text-gray-500 text-wrap">
              Generated on {formatDate(Date.now())} · Analysis ID: {atsData.analysisId}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button onClick={()=>setActiveTab('upload')} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#25428F] text-[#25428F] rounded-lg font-medium hover:bg-blue-50 transition-colors">
              <LuRefreshCw size={18} />
              Re-analyze
            </button>
            
          </div>
        </div>

        {/* --- Navigation Tabs --- */}
        <div className="border-b border-gray-200 mb-8 overflow-x-auto">
          <div className="flex gap-8 min-w-max px-2">
            <button onClick={()=>setActiveOption('score')} className={`${activeOption=='score'?'text-[#25428F] border-b-2 border-[#25428F]':'text-gray-500 hover:text-gray-700'}pb-4 text-[#25428F]  text-sm cursor-pointer`}>Score Overview</button>
            <button onClick={()=>setActiveOption('keyword')} className={`${activeOption=='keyword'?'text-[#25428F] border-b-2 border-[#25428F]':'text-gray-500 hover:text-gray-700'}pb-4 text-[#25428F]  text-sm cursor-pointer`}>Keyword Analysis</button>
            <button onClick={()=>setActiveOption('suggestions')} className={`${activeOption=='suggestions'?'text-[#25428F] border-b-2 border-[#25428F]':'text-gray-500 hover:text-gray-700'}pb-4 text-[#25428F]  text-sm cursor-pointer`}>Suggestions</button>
            {/* <button onClick={()=>setActiveOption('action')} className={`${activeOption=='action'?'text-[#25428F] border-b-2 border-[#25428F]':'text-gray-500 hover:text-gray-700'}pb-4 text-[#25428F]  text-sm cursor-pointer`}>Action Plan</button> */}
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        {
          activeOption=='score'&&
          <ScoreTab atsData={atsData} setAnimatedScore={setAnimatedScore} animatedScore={animatedScore}/>
        }
        {
          activeOption=='keyword'&&
          <KeywordsTab atsData={atsData} />
        }
        {
          activeOption=='suggestions'&&
          <SuggestionTab atsData={atsData} />
        }
        {
          activeOption=='action'&&
          <ActionsTab atsData={atsData} />
        }
        
      </div>
    </div>
  );
};

export default AtsAnalysisReport;