import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';

const InputField = ({ label, required, placeholder, type = "text", value, onChange }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
        />
    </div>
);

const PersonalDetailsForm = ({resumeData,setResumeData}) => {
    const [personal,setPersonal] = useState(resumeData?.personal||{});

    useEffect(()=>{
        setResumeData(prev=>({...prev,personal}))
    },[personal]);
    return (
        <div className="space-y-6">
            {/* ATS Tip Banner */}
            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                <Info size={18} className="mt-0.5 shrink-0" />
                <p><strong>ATS Tip:</strong> Include LinkedIn and GitHub URLs — they add up to 9 ATS points.</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <InputField label="Full Name" required placeholder="e.g. Mitsuha Chen" value={personal.fullName} onChange={(e)=>setPersonal(prev=>({...prev,fullName:e.target.value}))}/>
                </div>

                <InputField label="Email Address" required type="email" placeholder="mitsuha.chen@email.com" value={personal.email} onChange={(e)=>setPersonal(prev=>({...prev,email:e.target.value}))} />
                <InputField label="Phone Number" required type="tel" placeholder="+1 (415) 555-0182" value={personal.phone} onChange={(e)=>setPersonal(prev=>({...prev,phone:e.target.value}))} />

                <InputField label="Location" placeholder="San Francisco, CA" value={personal.location} onChange={(e)=>setPersonal(prev=>({...prev,location:e.target.value}))} />
                <InputField label="LinkedIn URL" placeholder="linkedin.com/in/mitsuhauchen" value={personal.linkedin} onChange={(e)=>setPersonal(prev=>({...prev,linkedin:e.target.value}))} />

                <div className="md:col-span-2">
                    <InputField label="GitHub Profile" placeholder="github.com/mitsuhauchen" value={personal.github} onChange={(e)=>setPersonal(prev=>({...prev,github:e.target.value}))} />
                </div>

                <div className="md:col-span-2">
                    <InputField label="Portfolio / Website" placeholder="mitsuhauchen.dev" value={personal.portfolio} onChange={(e)=>setPersonal(prev=>({...prev,portfolio:e.target.value}))} />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">Professional Summary</label>
                    <p className="text-xs text-gray-500 mb-1">3-4 sentences. Include your target role, years of experience, key technologies, and one achievement.</p>
                    <textarea
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        value={personal.summary}
                        onChange={(e)=>setPersonal(prev=>({...prev,summary:e.target.value}))}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;