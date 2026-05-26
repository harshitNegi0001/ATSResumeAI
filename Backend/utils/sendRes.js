



export const sendRes = (res,statusCode,jsonData)=>{
    return res.status(statusCode).json(jsonData);
}