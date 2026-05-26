import { useEffect } from "react";
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
import OverallScoreCard from "./OverallScoreCard";

const StatCard = ({ icon: Icon, title, value, subtitle, iconColor, iconBg }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);


export default function ScoreTab({ atsData, animatedScore, setAnimatedScore }) {

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left Column: Overall Score Card */}
      <OverallScoreCard atsScore={atsData?.ats_score} />

      {/* Right Column: Stats & Progress */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* 2x2 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={LuCircleCheck}
            title="Keywords Found"
            value={atsData?.matched_keywords?.length || 0}
            subtitle={`${atsData?.total_required_keywords?.length
                ? Math.round((atsData.matched_keywords.length / atsData.total_required_keywords.length) * 100)
                : 0
              }%`}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
          />
          <StatCard
            icon={LuCircleCheck}
            title="Sections Parsed"
            value={atsData.sectionsParsed}
            subtitle={atsData.sectionStatus}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50"
          />
          <StatCard
            icon={LuTriangleAlert}
            title="Issues Found"
            value={atsData.issuesFound}
            subtitle={atsData.issuesDetail}
            iconColor="text-amber-500"
            iconBg="bg-amber-50"
          />
          <StatCard
            icon={LuTrendingUp}
            title="Score Potential"
            value={atsData.scorePotential}
            subtitle={atsData.potentialDetail}
            iconColor="text-blue-500"
            iconBg="bg-blue-50"
          />
        </div>

        {/* Progress Bar Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mt-auto">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-900">Progress to 90+ Score</h3>
            <span className="text-[#3b82f6] font-bold">{animatedScore} / 90</span>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 mb-3 relative overflow-hidden">
            <div
              className="bg-[#3b82f6] h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(animatedScore / 90) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>Current: {animatedScore}</span>
            <span>{atsData?.ats_score < 90 && `${90 - animatedScore} points away from 90+`}</span>
            <span>Target: 90</span>
          </div>
        </div>

      </div>
    </div>

  )
}