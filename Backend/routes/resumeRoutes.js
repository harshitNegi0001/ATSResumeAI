import e from "express";
import Resume from '../controllers/resumeController.js';
import { upload } from "../config/multer.js";

const router= e.Router();

router.get('/resume',Resume.getResume);
router.post('/resume/analyze',upload.single('resume'),Resume.analyzeResume);
router.post('/resume/enhance',Resume.enhanceResume);
router.post('/resume/generate',Resume.generateResume);

export default router;