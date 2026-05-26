import mammoth from 'mammoth';
import pdfExtract from 'pdf-extraction'; // Nayi modern library

export const extractTextFromPDF = async (fileBuffer, mimetype) => {
    try {
        let extractedText = "";

        if (mimetype === 'application/pdf') {
            // Nayi library seedha buffer accept karti hai bina crash hue
            const data = await pdfExtract(fileBuffer);
            extractedText = data.text;
        } 
        else if (mimetype.includes('wordprocessingml') || mimetype === 'application/msword') {
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            extractedText = result.value;
        } 
        else {
            throw new Error("Only PDF and DOCX files are allowed!");
        }

        if (!extractedText || extractedText.trim() === "") {
            throw new Error("The file is empty or the format is not supported.");
        }

        return extractedText;
    } catch (err) {
        console.error("Text Extraction Error:", err);
        throw new Error("Error extracting text from file: " + err.message);
    }
};