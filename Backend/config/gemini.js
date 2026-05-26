import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



export const analyzeResumeWithAI = async (resumeText) => {
    try {
        // Gemini 1.5 Flash fast aur cost-effective hai (free tier par perfectly chalega)
        const model = ai.getGenerativeModel({
            model: "models/gemini-3-flash-preview",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const prompt = `Act as an expert Enterprise ATS (Applicant Tracking System) and Senior Tech Recruiter. 
        Analyze the following resume text strictly against modern software engineering industry standards.
        
        You MUST return ONLY a valid JSON object. Do not add any markdown formatting like \`\`\`json or backticks.
        
        Required JSON Structure:
        {
            "ats_score": (number between 0-100),
            "summary": (string: 2-3 lines of honest, constructive feedback),
            "sections_parsed": (string: fraction format, e.g., "8/10" where 8 is the number of crucial sections found and 10 is the total expected),
            "sections_missing": (array of strings: missing crucial sections, e.g., ["Projects", "Certifications"]),
            "issues_found":(number counts of issues you found in resume data between 0-100),
            "issues_detail": (string: brake counts based on your issues_found, e.g., "2 critical · 3 warning · 1 suggestion"),
            "total_required_keywords": (array of strings: all industry-standard keywords expected for this specific role),
            "matched_keywords": (array of strings: the required keywords that were actually found in the resume),
            "issues_summary": (array of strings: 1-sentence summaries of the top issues found),
            "suggestions": [
                {
                    "level": (string enum: strictly "critical", "warning", or "suggestion". Use 'critical' for missing segments/spelling mistakes, 'warning' for missing keywords, and 'suggestion' for overall score improvements),
                    "suggestion_keyword": (string: a short tag, e.g., "Contact Info", "Grammar", "Action Verbs"),
                    "description": (string: 1-3 lines explaining the issue and how to fix it)
                }
            ]
        }
        
        Resume Text to analyze:
        ${resumeText}`;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        // Safety Clean-up: Agar galti se Gemini ne markdown (```json) de diya toh usko hata do
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // JSON parse karke return karo
        return JSON.parse(responseText);

    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("AI analysis fail ho gaya: " + error.message);
    }
};

export const buildResumeWithAI = async (rawData) => {
    try {
        // 1. Add generationConfig to force JSON output natively
        const model = ai.getGenerativeModel({
            model: "models/gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const prompt = `You are an Expert Resume Writer and Senior Tech Recruiter.
        I am providing you with a user's raw, unpolished resume data. Your task is to rewrite and enhance this content to make it universally professional, highly impactful, and 100% ATS-optimized.
        
        Guidelines for enhancement:
        1. Professional Summary: Create a powerful 3-4 line summary highlighting their core strengths.
        2. Work Experience & Projects: Expand thin descriptions. Use strong action verbs (e.g., Engineered, Architected, Spearheaded) and follow the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]) wherever possible.
        3. Skills: Organize and polish the skills into a clean array.
        4. Smart Handling: If a field is empty or missing in the raw data, leave it empty or return an empty array in the JSON. Do not invent fake jobs, education, or personal details.
        
        Raw Input Data:
        ${JSON.stringify(rawData)}
        
        Required JSON Structure:
        {
            "personal_information": {
                "full_name": "Properly capitalized name",
                "email": "email address",
                "phone": "phone number",
                "location": "location",
                "linkedin": "url",
                "github": "url",
                "portfolio": "url",
                "summary": "Enhanced 3-4 line professional summary"
            },
            "education": [
                {
                    "degree": "Degree/Course name",
                    "institution": "School/College name",
                    "duration": "Year or Duration",
                    "details": "Any extra details or grades if provided, else empty string"
                }
            ],
            "work_experience": [
                {
                    "job_title": "Polished Job Title",
                    "company": "Company Name",
                    "duration": "Duration",
                    "achievements": [
                        "Highly professional and ATS-optimized bullet point 1",
                        "Highly professional and ATS-optimized bullet point 2"
                    ]
                }
            ],
            "projects": [
                {
                    "project_name": "Name of the project",
                    "tech_stack": "Technologies used (e.g., React, Node.js, PostgreSQL)",
                    "description": [
                        "Enhanced bullet point explaining what the project does and its impact",
                        "Enhanced bullet point about the technical implementation"
                    ]
                }
            ],
            "skills": ["Polished Skill 1", "Polished Skill 2", "Polished Skill 3"]
        }`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // 2. No string replacement needed! Gemini guarantees valid JSON syntax.
        return JSON.parse(responseText);

    } catch (error) {
        console.error("Gemini Builder Error:", error);
        throw new Error("AI se resume build karne mein dikkat aayi: " + error.message);
    }
};