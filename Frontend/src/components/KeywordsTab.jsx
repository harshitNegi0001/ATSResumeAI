import React, { useState } from 'react';
import { CheckCircle2, XCircle, Search } from 'lucide-react';

// --- Helper Functions to generate UI-specific mock data from raw strings ---
const getCategory = (keyword) => {
  const kw = keyword.toLowerCase();
  if (['react', 'javascript', 'html', 'css', 'tailwind', 'typescript'].some(k => kw.includes(k))) return 'Frontend';
  if (['node', 'express', 'api', 'graphql'].some(k => kw.includes(k))) return 'Backend';
  if (['sql', 'mongo', 'redis', 'database'].some(k => kw.includes(k))) return 'Database';
  if (['git', 'docker', 'aws', 'kubernetes', 'ci/cd', 'terraform', 'cloud'].some(k => kw.includes(k))) return 'DevOps';
  if (['agile', 'testing', 'code review', 'tdd', 'qa'].some(k => kw.includes(k))) return 'Process';
  return 'Skill';
};

const getPointsData = (keyword) => {
  // Deterministic point generation based on string length (for visual realism)
  const len = keyword.length;
  if (len > 11) return { pts: 4, impact: 'High', color: 'text-red-500' };
  if (len > 8) return { pts: 3, impact: 'High', color: 'text-red-500' };
  if (len > 5) return { pts: 2, impact: 'Medium', color: 'text-amber-500' };
  return { pts: 1, impact: 'Low', color: 'text-gray-500' };
};

export default function KeywordsTab({ atsData }) {
  // Safe fallback if data is not yet loaded
  if (!atsData) return <div className="p-8 text-center text-gray-500">Loading keywords data...</div>;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'High', 'Medium', 'Low'

  // --- Derived Data Calculations ---
  const matched = atsData.matched_keywords || [];
  const totalRequired = atsData.total_required_keywords || [];
  
  // Missing keywords = Total required - Matched
  const missing = totalRequired.filter(kw => !matched.includes(kw));

  const matchRate = totalRequired.length > 0 
    ? Math.round((matched.length / totalRequired.length) * 100) 
    : 0;

  // --- Search & Filter Logic for Missing Keywords ---
  const filteredMissing = missing.filter(kw => {
    const matchesSearch = kw.toLowerCase().includes(searchQuery.toLowerCase());
    const impactData = getPointsData(kw);
    
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && impactData.impact === activeFilter;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-sans">
      
      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Matched Stat */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Keywords Matched
          </h3>
          <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-1">
            {matched.length}
          </div>
          <p className="text-sm text-gray-500">Found in your resume</p>
        </div>

        {/* Missing Stat */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Keywords Missing
          </h3>
          <div className="text-4xl md:text-5xl font-bold text-red-500 mb-1">
            {missing.length}
          </div>
          <p className="text-sm text-gray-500">Not found in your resume</p>
        </div>

        {/* Match Rate Stat */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Match Rate
          </h3>
          <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-1">
            {matchRate}%
          </div>
          <p className="text-sm text-gray-500">Target: 80%+</p>
        </div>
      </div>

      {/* ================= MATCHED KEYWORDS SECTION ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-bold text-gray-900">
            Matched Keywords ({matched.length})
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {matched.map((kw, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50/80 border border-emerald-100 rounded-full text-sm transition-all hover:bg-emerald-100"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-emerald-700">{kw}</span>
              <span className="text-emerald-600/70 text-xs font-medium">· {getCategory(kw)}</span>
            </div>
          ))}
          {matched.length === 0 && (
            <p className="text-gray-500 text-sm">No keywords matched.</p>
          )}
        </div>
      </div>

      {/* ================= MISSING KEYWORDS SECTION ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        
        {/* Header, Search & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Missing Keywords ({missing.length})
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Impact Filters */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['All', 'High Impact', 'Medium Impact', 'Low Impact'].map((filter) => {
                const value = filter.split(' ')[0]; // 'All', 'High', 'Medium', 'Low'
                const isActive = activeFilter === value;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(value)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-[#25428F] text-white shadow-sm' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Missing Keywords List */}
        <div className="flex flex-wrap gap-3">
          {filteredMissing.map((kw, idx) => {
            const { pts, color } = getPointsData(kw);
            return (
              <div 
                key={idx} 
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-red-50/50 border border-red-100 rounded-full text-sm transition-all hover:bg-red-50"
              >
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-semibold text-red-600">{kw}</span>
                <span className={`${color} text-xs font-bold`}>
                  +{pts} pt{pts > 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
          
          {filteredMissing.length === 0 && missing.length > 0 && (
            <p className="text-gray-500 text-sm py-4 w-full text-center bg-gray-50 rounded-xl">
              No keywords found matching your filter criteria.
            </p>
          )}
          {missing.length === 0 && (
            <p className="text-emerald-500 text-sm py-4 w-full text-center bg-emerald-50 rounded-xl font-medium">
              Great job! You have matched all required keywords.
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
}