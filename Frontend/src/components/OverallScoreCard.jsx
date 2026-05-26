import React, { useEffect, useState } from "react";
import { LuAward } from "react-icons/lu";

// Ek helper function jo score ke hisaab se dynamic colors aur text return karega
const getScoreDetails = (score) => {
  if (score < 60) {
    return {
      label: "Poor",
      color: "#ef4444", // Tailwind red-500
      bgClass: "bg-red-50 text-red-600 border-red-100",
    };
  } else if (score < 80) {
    return {
      label: "Fair",
      color: "#f59e0b", // Tailwind amber-500
      bgClass: "bg-amber-50 text-amber-600 border-amber-100",
    };
  } else {
    return {
      label: "Good",
      color: "#10b981", // Tailwind emerald-500
      bgClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
  }
};

export default function OverallScoreCard({ atsScore = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // --- Animation Logic ---
  useEffect(() => {
    if (!atsScore) return;
    
    let start = 0;
    const duration = 1500; // 1.5s animation
    const increment = atsScore / (duration / 16); // 60fps frame calculations

    const timer = setInterval(() => {
      start += increment;
      if (start >= atsScore) {
        setAnimatedScore(atsScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [atsScore]);

  // --- SVG Circle Math ---
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // Approx 263.89
  // Progress ko calculate karna based on animatedScore (not final score, taki line bhi count ke sath grow ho)
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;

  // Get dynamic details based on the FINAL score
  const scoreDetails = getScoreDetails(atsScore);

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center max-w-sm mx-auto">
      
      <h2 className="text-[#3b82f6] text-sm font-bold tracking-widest uppercase mb-8">
        Overall ATS Score
      </h2>

      {/* --- Dynamic Animated SVG Circle --- */}
      <div className="relative w-48 h-48 flex flex-col items-center justify-center mb-6">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full transform -rotate-90" // -rotate-90 taaki progress top se start ho
        >
          {/* Background Track (Grey) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          
          {/* Animated Progress Track (Dynamic Color) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={scoreDetails.color} // Dynamic Hex Color
            strokeWidth="8"
            strokeLinecap="round" // Ends ko round karne ke liye
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-75 ease-out"
          />
        </svg>

        {/* --- Inner Text Content --- */}
        <div className="absolute flex flex-col items-center justify-center">
          <span 
            className="text-6xl font-bold tabular-nums"
            style={{ color: scoreDetails.color }}
          >
            {animatedScore}
          </span>
          <span className="text-gray-500 text-sm mt-1">out of 100</span>
          
          {/* Dynamic Badge */}
          <span className={`mt-2 px-3 py-0.5 border rounded-full text-xs font-semibold ${scoreDetails.bgClass}`}>
            {scoreDetails.label}
          </span>
        </div>
      </div>

      {/* --- Legend --- */}
      <div className="flex justify-between w-full text-sm font-medium px-2 mb-8">
        <span className="text-red-500">0–59 Poor</span>
        <span className="text-amber-500">60–79 Fair</span>
        <span className="text-emerald-500">80–100 Good</span>
      </div>

      {/* --- Footer Tip --- */}
      <div className="flex items-center gap-3 w-full justify-center">
        <LuAward className="text-amber-500 shrink-0" size={20} />
        <p className="text-sm text-gray-600">
          Improve to <span className="font-bold text-gray-900">90+</span> to maximize callbacks
        </p>
      </div>
      
    </div>
  );
}