import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const templates = [
    { id: 'classic', name: 'Classic Professional', badge: 'Most ATS-Safe', badgeColor: 'bg-emerald-100 text-emerald-700', desc: 'Traditional two-column layout. Best for corporate, finance, and consulting roles.' },
    { id: 'modern', name: 'Modern Tech', badge: 'Recommended', badgeColor: 'bg-blue-100 text-blue-700', desc: 'Clean single-column with subtle accent. Optimized for software engineering roles.' },
    { id: 'minimal', name: 'Minimal Clean', badge: 'Popular', badgeColor: 'bg-cyan-100 text-cyan-700', desc: 'Ultra-clean whitespace-first design. Great for design, UK, and creative roles.' },
    { id: 'executive', name: 'Executive Bold', badge: 'Senior Roles', badgeColor: 'bg-amber-100 text-amber-700', desc: 'Bold header with strong hierarchy. Suited for senior leadership and director roles.' },
];

const TemplateSelector = ({ selected, onSelect }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Choose a Template</h2>
                <p className="text-sm text-gray-500">All templates are fully ATS-compatible. Pick the one that fits your target role.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {templates.map((tpl) => (
                    <div
                        key={tpl.id}
                        onClick={() => onSelect(tpl.id)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col h-full
              ${selected === tpl.id ? 'border-blue-500 shadow-md bg-blue-50/10' : 'border-gray-100 hover:border-gray-300 bg-white'}
            `}
                    >
                        {selected === tpl.id && (
                            <div className="absolute top-3 right-3 text-blue-500">
                                <CheckCircle2 size={20} className="fill-white" />
                            </div>
                        )}

                        {/* Mock Wireframe image space */}
                        <div className="bg-gray-50 border border-gray-100 rounded-lg h-40 mb-4 w-full flex items-start justify-center p-2">
                            <div className="w-3/4 h-full bg-white shadow-sm border border-gray-100 rounded flex flex-col p-2 gap-1">
                                <div className={`h-2 rounded ${tpl.id === 'executive' ? 'bg-blue-800 h-4' : 'bg-gray-200'}`}></div>
                                <div className="h-1 bg-gray-200 w-3/4 rounded mt-2"></div>
                                <div className="h-1 bg-gray-200 w-full rounded"></div>
                                <div className="h-1 bg-gray-200 w-5/6 rounded"></div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">{tpl.name}</h3>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2 ${tpl.badgeColor}`}>
                                {tpl.badge}
                            </span>
                            <p className="text-xs text-gray-500 leading-relaxed">{tpl.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;