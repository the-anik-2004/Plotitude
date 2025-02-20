import prisma from "../lib/prisma.js";
import bycrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//Fetching all the users
export const getUsers=async(req,res)=>{
   try {
     const users=await prisma.user.findMany();
     return res.status(200).json(users)
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Failed to FETCH Users !"})
   }
}
//Getting user based upon the id
export const getUser=async(req,res)=>{
     try {
        const reqId=req.params.id;
        const user=await prisma.user.findUnique({
            where:{id:reqId}
        })
        return res.status(200).json(user);
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Failed to get an User !"})
   }
}

//update user info
export const updateUser=async(req,res)=>{
 try {
    const userId=req.params.id;
    const tokenUserId=req.userId;
    const {password,avatar,...otherInputs}=req.body;
    let updatedPassword=null;

    if(password){
        updatedPassword=await bycrypt.hash(password,10);
    }
    

    if(userId!==tokenUserId)return res.status(403).json({message:"User Not Authorized"});
    else{
        const updatedUser=await prisma.user.update({
            where:{id:userId},
            data:{
                ...otherInputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            },
        });
        const{password:userPassword,...data}=updatedUser;
        return res.status(200).json(data)
    }
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Failed to update User Information !"})
   }
}
// delete any existing user
export const deleteUser=async(req,res)=>{
 try {
    const id=req.params.id;
    const tokenUserId=req.userId;

    if(id!==tokenUserId) return res.status(403).json({message:"User Not Authorized"});

    await prisma.user.delete({
        where:{id}
    })
    return res.status(200).json({message:`User [id:${id}] is deleted`});
   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Failed to delete Users !"})
   }
}

//Save Post 
export const savePost=async(req,res)=>{
    const {postId}=req.body;
    const tokenUserId=req.userId;
    // console.log(tokenUserId, postId);
    if (!postId) {
        return res.status(400).json({ success: false, message: "Post ID is required." });
    }

    try {
        const savedPost=await prisma.savedPost.findFirst({
            where:{
                    userId:tokenUserId,
                    postId,
            },
        });
        
        if (savedPost){
            await prisma.savedPost.delete({
                where:{id:savedPost.id},
            });
           return res.status(200).json({message:"Post is removed from Saved List"});
        }else{
            await prisma.savedPost.create({
                data:{
                    userId:tokenUserId,
                    postId,
                },
            })
            return res.status(200).json({message:"Post is saved in Saved List"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to update save post", error: error.message });
    }
}

//profile Posts
export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
  
    try {
      // Ensure userId is a valid format (optional if you trust the input)
      if (!tokenUserId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      // Execute queries in parallel for better performance
      const [userPosts, saved] = await Promise.all([
        prisma.post.findMany({
          where: { userId: tokenUserId },
        }),
        prisma.savedPost.findMany({
          where: { userId: tokenUserId },
          include: { post: true },
        }),
      ]);
  
      // Extract saved posts
      const savedPosts = saved.map((item) => item.post);
  
      return res.status(200).json({ userPosts, savedPosts });
    } catch (error) {
      console.error("Error in profilePosts controller:", error);
      return res.status(500).json({ message: "Failed to get profile posts!" });
    }
  };
  
// NOTIFICATION
export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const number = await prisma.chat.count({
        where: {
          userIds: {
            hasSome: [tokenUserId],
          },
          NOT: {
            seenBy: {
              hasSome: [tokenUserId],
            },
          },
        },
      });
      res.status(200).json(number);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profile posts!" });
    }
  };