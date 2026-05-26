import axios from 'axios';
import toast from 'react-hot-toast';



const backend_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


export const analyzeResume = async(formData,successFunction)=>{
    try {
        const response = await axios.post(
            `${backend_url}/api/resume/analyze`,
            formData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        successFunction(response?.data?.aiAnalysis);

    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "An error occurred while analyzing the resume.");
    }
}

export const generateResume = async(resumeData,successFunction)=>{
    try {
        const response = await axios.post(
            `${backend_url}/api/resume/generate`,
           {
            resumeData
           },
            {
                
            }
        );
        successFunction(response?.data?.generatedResume);
        
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "An error occurred while generating the resume.");
    }
}