import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const shouldBeLoggedIn =async (req,res)=>{
    console.log(req.userId);
    return   res.status(200).json({message:"You are Authenticated"})
}

export const shouldBeAdmin =async (req,res)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({message:"User Not Authenticated ..!"});
    
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if (err)res.status(403).json({message:"Token not valid ..!"});
        if(!payload.isAdmin)res.status(403).json({message:"Not authorized"})
    })
    res.status(200).json({message:"You are Authenticated"})
}