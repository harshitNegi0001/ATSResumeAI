import React from 'react';
import { Info } from 'lucide-react';

const CompletionTracker = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <div className="mb-6">
                <h3 className="font-bold text-gray-900">Resume Completion</h3>
                <p className="text-xs text-gray-500">0/4 required sections filled</p>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
                {/* Simple CSS Circular Progress */}
                <div className="relative w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">0%</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {['Personal Details', 'Education', 'Experience', 'Skills'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                    </div>
                ))}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                        <span className="text-sm text-gray-600">Projects</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>
                </div>
            </div>

            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm mb-4">
                <Info size={16} className="mt-0.5 shrink-0" />
                <p><strong>ATS Tip:</strong> Adding all sections increases your ATS score by up to 18 points.</p>
            </div>

            <button disabled className="w-full bg-blue-300 text-white font-medium py-3 rounded-xl cursor-not-allowed">
                Generate Resume
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">Fill at least 3 required sections to generate</p>
        </div>
    );
};

export default CompletionTracker;