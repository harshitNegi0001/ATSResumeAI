import multer from 'multer';

const storage = multer.memoryStorage();



const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ,
        'application/msword'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and Word files are allowed!'), false); 
    }
};


export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});


// kya ye limit cross karne me error dega? with proper error message? 