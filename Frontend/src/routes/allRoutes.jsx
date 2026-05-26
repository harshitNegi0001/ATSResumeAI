import { lazy } from "react"
const Analyzer = lazy(()=>import("../pages/Analyzer"));
const Home = lazy(()=>import("../pages/Home"));
const ResumeBuilder = lazy(()=>import("../pages/Builder"));



export const allRoutes = [
    {
        id:1,
        path:'/',
        element:<Home />
    },
    {
        id:2,
        path:'/analyzer',
        element:<Home />
    },
    {
        id:3,
        path:'/builder',
        element:<ResumeBuilder />
    }
    ,
    // {
    //     id:4,
    //     path:'*',
    //     element:<Analyzer />
    // }
]