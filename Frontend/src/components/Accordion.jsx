import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ title, subtitle, icon: Icon, isOpen, onToggle, children }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 focus:outline-none hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg">
                        <Icon size={20} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-900">{title}</h3>
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                </div>
                <div className="text-gray-400">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Accordion Content */}
            {isOpen && children && (
                <div className="p-5 border-t border-gray-100 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;