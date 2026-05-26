import React from 'react'
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Appbar = () => {
    const navigate = useNavigate();
    return (
        <div className='fixed top-0 left-0 w-full p-2 shadow-md shadow-black/30 z-100 bg-white flex items-center '>
            <div className='container w-full m-auto flex items-center justify-between gap-2'>
                <div className=''>
                    <h1 className="text-xl sm:text-2xl font-bold " style={{
                        fontFamily: 'Cedarville Cursive'
                    }}>
                        <span className="text-black">ATS</span>
                        <span className="text-blue-800">Resume</span>
                        <span className="text-black">AI</span>
                    </h1>
                </div>
                <div className='flex items-center gap-2'>
                    {/* navs options  */}
                    <button onClick={() => navigate('/analyzer')}
                        className='px-1 sm:px-4 py-2 sm:py-3 flex gap-0.5 items-center justify-center border-2 border-blue-800 rounded-lg text-blue-800 text-[10px]/3 sm:text-[14px]
                font-[500] capitalize hover:bg-blue-800/5 active:bg-blue-800/10'>
                        Analyze resume
                    </button>
                    <button onClick={() => navigate('/builder')} className='px-1 sm:px-4 py-2 sm:py-3  flex gap-0.5 items-center justify-center bg-blue-800 rounded-lg text-white text-[10px]/3 sm:text-[14px]
                font-[500] capitalize hover:bg-blue-900'>
                        Build resume
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Appbar
