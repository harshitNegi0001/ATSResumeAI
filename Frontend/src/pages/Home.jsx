import { useState } from "react";
import ResumeDropBox from "../components/ResumeDropBox";
import AtsAnalysisReport from "../components/ATSScorePage";

export default function Home() {
    const [activeTab, setActiveTab] = useState('upload');
    const [atsData, setAtsData] = useState({
        fileName: 'Harshit_Singh_Negi_resume2.pdf.docx',
        analysisId: 'ATS-2026-1779782497809',
        ats_score: 68,
        summary: "Strong project foundation for an entry-level candidate, particularly with full-stack implementations. However, the resume lacks professional quantification (metrics), is missing a LinkedIn profile, and follows an outdated 'Objective' format rather than a 'Professional Summary'.",
        total_required_keywords: [
            'JavaScript', 'React.js',
            'Node.js', 'PostgreSQL',
            'TypeScript', 'REST API',
            'Git', 'Unit Testing',
            'Agile', 'Docker',
            'Tailwind CSS', 'Redux',
            'Express.js'
        ],
        matched_keywords: [
            'JavaScript',
            'React.js',
            'Node.js',
            'PostgreSQL',
            'REST API',
            'Git',
            'Redux',
            'Express.js'
        ],
        sectionsParsed: '7/10',
        suggestions: [
            {
                level: 'critical',
                suggestion_keyword: 'Contact Info',
                description: 'Missing LinkedIn profile URL. Tech recruiters use LinkedIn as a primary verification tool; excluding it can lead to immediate rejection in automated screens.'
            },
            {
                level: 'warning',
                suggestion_keyword: 'Quantifiable Metrics',
                description: "Your projects describe 'what' you did but not 'how well'. Add metrics like 'reduced load time by 20%' or 'handled 50+ concurrent socket connections' to demonstrate scale."
            },
            {
                level: 'warning',
                suggestion_keyword: 'Keyword Gap',
                description: 'Missing TypeScript and Unit Testing (Jest/Cypress). These are high-frequency keywords for React/Node roles in 2024 enterprise environments.'
            },
            {
                level: 'suggestion',
                suggestion_keyword: 'Resume Format',
                description: "Replace 'Career Objective' with 'Professional Summary'. Focus on what value you bring to the company rather than what you are seeking from them."
            }
        ],
        sectionStatus: 'Projects section missing',
        sectionsMissing: [
            'Professional Experience',
            'LinkedIn Profile',
            'Internships',
            'Languages'
        ],
        issuesFound: 5,
        issuesDetail: '1 critical · 3 warning · 1 suggestion',
        issues_summary: [
            'Missing LinkedIn profile which is essential for tech verification.',
            'Project descriptions lack quantifiable metrics or impact data.',
            'Technical skills are missing modern industry standards like TypeScript.',
            'Objective section is outdated; modern resumes use Professional Summaries.',
            'Education section lists high school which is redundant for university-level students.'
        ],
        scorePotential: '94+',
        potentialDetail: 'After applying fixes'
    });
    return (
        <div className="flex items-center p-2 pt-16 bg-white">
            {activeTab == 'upload' && <ResumeDropBox setActiveTab={setActiveTab} setAtsData={setAtsData} />}
            {activeTab == 'score' && <AtsAnalysisReport setActiveTab={setActiveTab} atsData={atsData} />}

        </div>
    )
}