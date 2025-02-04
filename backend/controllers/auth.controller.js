import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// REGISTER USER
export const register=async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        
        //HASH the Password to save in DB
        const hashedPassword= await bcrypt.hash(password,10);
        console.log(hashedPassword);
        
        //CREATE new User & SAVE user's data in DB
        const newUser=await prisma.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })
        console.log(newUser);
        res.status(201).json({message:"User Created successfully..."});
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Failed to a New Create User..."})
    }
}

// LOGIN USER
export const login=async(req,res)=>{
    const {username,password}=req.body;

try {
        //check user is exist or not
        const user= await prisma.user.findUnique({
            where:{username}
        });
    
        if(!user) res.status(401).json({message:"invalid credentials"})
    
        //check password isvalid or not
        const isPasswordValid= await bcrypt.compare(password,user.password);
    
        if(!isPasswordValid)  return res.status(401).json({message:"invalid credentials"})
    
        //send user a cookie token
        const age=1000*60*60*24*7;
        
        const token=jwt.sign({
            id:user.id,
            isAdmin:true
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:age}
    
    );     //cmd :console-ninja node --env-file .env --watch app.js 

        const {password:userPassword, ...userInfo}=user;
        res.cookie("token",token,{   //after importing cookie-parser
            httpOnly:true,
            // secure:true,
            maxAge:age
        }).status(200).json(userInfo);

} catch (error) {
    console.log(error);
    return res.status(501).json({message:"Failed to login user"})
}
}

// LOGOUT USER
export const logout=(req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout successfully"})
}