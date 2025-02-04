import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

//get Post
export const getPost=async(req,res)=>{
    const id=req.params.id;
    try {
        const post=await prisma.post.findUnique(
            {
                where:{id},
                include:{
                    postDetail:true,
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    }
                }
            });

            if (!post) {
                return res.status(404).json({ message: "Post not found!" });
            }

        
            const token=req.cookies?.token;
            // console.log("jwt-"+process.env.JWT_SECRET_KEY)
            if(token){
                jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
                    if(!err){
                        const saved =await prisma.savedPost.findFirst({
                            where: {
                                    userId: payload.id,
                                    postId: id,
                              },   
                        });
                        return res.status(200).json({ ...post, isSaved: saved ? true : false });
                    }else{
                        return res.status(401).json({ message: "Invalid token" });
                    }
                });
            } else {
                return res.status(200).json({ ...post, isSaved: false });
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"failed to fetch post❌"})
    }
}

  


//get all Posts
export const getPosts=async(req,res)=>{
    const query=req.query;
    console.log("-"+query);
    try {
        const savedPost=await prisma.savedPost.findFirst({
            where:{
                    userId:tokenUserId,
                    postId,
            },
        });
        const posts=await prisma.post.findMany({
            where:{
                city: query.city ? {
                  
                    equals: query.city, 
                    mode: 'insensitive' // Case-insensitive search
                } : undefined,
                type:query.type||undefined,
                property:query.property||undefined,
                bedroom:parseInt(query.bedroom)||undefined,
                price:{
                    gte:parseInt(query.minPrice)||0,
                    lte:parseInt(query.maxPrice)||10000000,
                }
            }
        });
        return res.status(200).json({...posts,isSaved:savedPost?true:false});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"failed to fetch posts❌"})
    }
}



//add Post
export const addPost = async (req, res) => {
    const tokenUserId = req.userId;
    const body=req.body;
    // Check if user is authorized
    if (!tokenUserId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
  
    try {
      // Create new post with proper data
    

      const newPost = await prisma.post.create({
        data: {
        ...body.postData,
          userId: tokenUserId, // Associate post with authenticated user
          postDetail:{
            create:body.postDetail,
          }
        },
      });
  
      // Return the newly created post
      return res.status(201).json(newPost);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Failed to add a post❌" });
    }
  };
  

//update Post [PENDING]
export const updatePost=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"failed to Update post❌"})
    }
}

//deleting the post
export const deletePost=async(req,res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    try {
        //--getting the post--
        const post=await prisma.post.findUnique({where:{id}})
        //--POST does not find
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }
        //--check the post belongings--
        if(post.userId!==tokenUserId){
            return res.status(403).json({message:"user not authorized"});
        }
        if (post.postDetail) {
            await prisma.postDetail.delete({
                where: { postId: id },
            });
        }
        //--deleting the posts
        await prisma.post.delete({
            where:{id}
        })

        return res.status(200).json({message:"Post deleted successfully"})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"failed to Delete post❌"})
    }
}


