import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import resumeRoute from './routes/resumeRoutes.js';
dotenv.config();

const port = process.env.PORT || 3000;


const app= express();

app.use(cors({
    origin:['http://localhost:5173','https://ats-resume-ai-silk.vercel.app'],
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',resumeRoute);

app.get('/', (req, res) => {
    res.send('ATS Backend is up and running!');
});
app.all('/{*path}', (req, res) => {
    res.status(404).json({ error: "Ye route exist nahi karta mere bhai!" });
});
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}.`);
})