import { analyzeResumeWithAI,buildResumeWithAI } from "../config/gemini.js";
import { extractTextFromPDF } from "../utils/pdfExtractor.js";
import { sendRes } from "../utils/sendRes.js";

class Resume {
    getResume = async (req, res) => {
        try {

        } catch (err) {

        }
    }
    analyzeResume = async (req, res) => {
        try {
            if (!req.file) {
                return sendRes(res, 400, {
                    success: false,
                    error: "Resume PDF is missing. Please attach a file."
                });
            }
            const resumeText = await extractTextFromPDF(req.file.buffer, req.file.mimetype);
            const aiAnalysisResult = await analyzeResumeWithAI(resumeText);
            // console.log("Analysis Complete!");

            const sectionsReview = aiAnalysisResult.sections_parsed || "0/0";
            const parts = sectionsReview.split("/");
            const parsed = Number(parts[0]);
            const total = Number(parts[1]);
            let statusText = "";
            if (parsed / total < 1) {
                statusText = "Projects section missing";
            } else {
                statusText = "Projects section complete"; // Agar 1 ya usse zyada hai (jaise "8/8")
            }
            
            const aiAnalysis = {
                fileName: req.file.originalname,
                analysisId: `ATS-2026-${Date.now()}`,
                ats_score: aiAnalysisResult.ats_score,
                summary: aiAnalysisResult.summary,
                total_required_keywords: aiAnalysisResult.total_required_keywords,
                matched_keywords:aiAnalysisResult.matched_keywords,
                sectionsParsed: aiAnalysisResult.sections_parsed,
                suggestions:aiAnalysisResult.suggestions,
                sectionStatus: statusText,
                sectionsMissing: aiAnalysisResult.sections_missing,
                issuesFound: aiAnalysisResult.issues_found,
                issuesDetail: aiAnalysisResult.issues_detail,
                issues_summary:aiAnalysisResult.issues_summary,
                scorePotential: "94+",
                potentialDetail: "After applying fixes"
            }

            // console.log(aiAnalysis)
            return res.status(200).json({
                success: true,
                message: "File successfully backend tak pohoch gayi!",
                aiAnalysis
            });
        } catch (err) {
            console.log('Error processing resume:', err);
            return sendRes(res, 500, {
                success: false,
                error: "Internal Server Error",
                message: err.message
            })
        }
    }
    enhanceResume = async (req, res) => {
        try {

        } catch (err) {

        }
    }
    generateResume = async (req, res) => {
        try {
            const { resumeData } = req.body;
            
        if (!resumeData) {
            return sendRes(res, 400, {
                success: false,
                error: "Resume data is missing. Please provide the required data."
            });
        }

        console.log("Building professional resume via AI...");

        // AI ko data bhej kar polish karwao (template parameter hata diya)
        const enhancedResumeData = await buildResumeWithAI(resumeData);
        return sendRes(res, 200, {
            success: true,
            message: "Resume successfully enhanced and structured by AI!",
            generatedResume: enhancedResumeData
        });
        }
        catch (err) {
            console.log('Error generating resume:', err);
            return sendRes(res, 500, {
                success: false,
                error: "Internal Server Error",
                message: err.message
            })
        }
    }
}


export default new Resume();