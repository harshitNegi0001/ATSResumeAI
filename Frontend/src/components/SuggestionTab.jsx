import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

// --- Helper configurations for different suggestion levels ---
const LEVEL_CONFIG = {
  critical: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    borderLeft: 'border-l-red-500',
    label: 'Critical',
    points: 5
  },
  warning: {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    borderLeft: 'border-l-amber-400',
    label: 'Warning',
    points: 3
  },
  suggestion: {
    icon: Info,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    borderLeft: 'border-l-cyan-400',
    label: 'Suggestion',
    points: 2
  }
};

export default function SuggestionTab({ atsData }) {
  if (!atsData || !atsData.suggestions) {
    return <div className="p-8 text-center text-gray-500">Loading suggestions...</div>;
  }

  // --- State Management ---
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(0); // Pehla item default open rakhne ke liye
  const [resolvedItems, setResolvedItems] = useState(new Set());

  // --- Data Transformation & Augmentation ---
  // API description ko (Title) aur (Detailed Fix) me split karne ka logic
  const augmentedSuggestions = useMemo(() => {
    return atsData.suggestions.map((item, index) => {
      // "Missing LinkedIn profile URL. Tech recruiters use..." -> Split by first period.
      const splitIndex = item.description.indexOf('.');
      const title = splitIndex !== -1 ? item.description.substring(0, splitIndex) : item.description;
      const details = splitIndex !== -1 ? item.description.substring(splitIndex + 1).trim() : 'Please address this issue to improve your ATS score.';
      
      return {
        ...item,
        id: index,
        title: title,
        details: details,
        config: LEVEL_CONFIG[item.level] || LEVEL_CONFIG.suggestion,
      };
    });
  }, [atsData.suggestions]);

  // --- Calculations ---
  const totalItems = augmentedSuggestions.length;
  const resolvedCount = resolvedItems.size;
  const completionPercentage = totalItems === 0 ? 0 : Math.round((resolvedCount / totalItems) * 100);
  
  // Total points user can earn from unresolved items
  const potentialPoints = augmentedSuggestions
    .filter(item => !resolvedItems.has(item.id))
    .reduce((sum, item) => sum + item.config.points, 0);

  // Filter counts
  const counts = {
    All: totalItems,
    Critical: augmentedSuggestions.filter(i => i.level === 'critical').length,
    Warning: augmentedSuggestions.filter(i => i.level === 'warning').length,
    Suggestions: augmentedSuggestions.filter(i => i.level === 'suggestion').length,
  };

  // Filter logic
  const filteredSuggestions = augmentedSuggestions.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical' && item.level === 'critical') return true;
    if (activeFilter === 'Warning' && item.level === 'warning') return true;
    if (activeFilter === 'Suggestions' && item.level === 'suggestion') return true;
    return false;
  });

  // --- Handlers ---
  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const toggleResolved = (e, id) => {
    e.stopPropagation(); // Accordion ko band/chalu hone se roke
    setResolvedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else {
        newSet.add(id);
        // Collapse if resolved
        if (expandedId === id) setExpandedId(null);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans space-y-6">
      
      {/* ================= HEADER & PROGRESS BAR ================= */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Improvement Suggestions
            </h2>
            <div className="text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
              <span>{resolvedCount} of {totalItems} resolved</span>
              <span className="hidden sm:inline">·</span>
              <span>
                Fixing all adds up to <span className="font-bold text-emerald-500">+{potentialPoints} pts</span>
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Critical', 'Warning', 'Suggestions'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#25428F] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter} ({counts[filter]})
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 relative overflow-hidden">
          <div 
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs font-medium text-gray-400">{completionPercentage}% complete</p>
      </div>

      {/* ================= SUGGESTIONS LIST ================= */}
      <div className="space-y-3">
        {filteredSuggestions.map((item) => {
          const isExpanded = expandedId === item.id;
          const isResolved = resolvedItems.has(item.id);
          const IconComponent = item.config.icon;

          return (
            <div 
              key={item.id} 
              className={`bg-white border transition-all duration-200 overflow-hidden ${
                isExpanded ? 'shadow-md rounded-2xl' : 'shadow-sm rounded-xl hover:border-gray-300'
              } ${
                isResolved ? 'border-gray-200 opacity-60 bg-gray-50 border-l-4 border-l-gray-300' : `border-gray-200 border-l-[4px] ${item.config.borderLeft}`
              }`}
            >
              {/* Accordion Header */}
              <div 
                onClick={() => toggleExpand(item.id)}
                className="px-4 py-4 md:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Icon */}
                  <div className="mt-1 sm:mt-0">
                    {isResolved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <IconComponent className={`w-5 h-5 ${item.config.color}`} />
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${isResolved ? 'bg-gray-200 text-gray-500' : `${item.config.bg} ${item.config.color}`}`}>
                        {item.config.label}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-500 border border-gray-200 uppercase tracking-wide">
                        {item.suggestion_keyword}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className={`text-sm md:text-base font-semibold pr-4 ${isResolved ? 'text-gray-500 line-through' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Points & Chevron */}
                <div className="flex items-center justify-end sm:justify-between gap-3 pl-9 sm:pl-0">
                  <span className={`text-sm font-bold whitespace-nowrap ${isResolved ? 'text-gray-400' : 'text-emerald-500'}`}>
                    +{item.config.points} pts
                  </span>
                  <div className="text-gray-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body (Expanded State) */}
              {isExpanded && !isResolved && (
                <div className="px-4 pb-5 md:px-5 md:pl-14 border-t border-gray-100 bg-gray-50/30">
                  <div className="pt-4 space-y-4">
                    
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Recruiters and ATS systems look for specific markers in the {item.suggestion_keyword.toLowerCase()} section. Fixing this increases your profile's visibility.
                    </p>

                    <div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Recommended Fix</h4>
                      <p className="text-sm text-gray-800 font-medium bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                        {item.details}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button 
                        onClick={(e) => toggleResolved(e, item.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-full transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Resolved
                      </button>
                      {/* <button className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium rounded-full transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                        Learn More
                      </button> */}
                    </div>
                    
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">No suggestions found in this category.</h3>
            <p className="text-gray-500 text-sm mt-1">You're doing great!</p>
          </div>
        )}
      </div>

    </div>
  );
}
