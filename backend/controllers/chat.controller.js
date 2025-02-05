import prisma from "../lib/prisma.js";

//Get Chats
export const getChats=async(req,res)=>{
    const tokenUserId =req.userId;
    try {
        const chats=await prisma.chat.findMany({
            where:{
                userIds:{
                    hasSome:[tokenUserId],
                }
            }
        });

        for (const chat of chats){
            const receiverId=chat.userIds.find(id=>id!==tokenUserId);

            const receiver=await prisma.user.findUnique({
                where:{
                    id:receiverId,
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            });
            chat.receiver=receiver;
        }
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({message:"failed to get chat!"})
    }
}

//Get Chat

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;

    console.log("Request received for chatId:", chatId, "by userId:", tokenUserId);

    if (!chatId || !tokenUserId) {
        return res.status(400).json({ message: "Invalid request: Missing chat ID or user ID" });
    }

    try {
        // Fetch chat
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIds: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                messages: true, // ✅ First, check if messages exist
            },
        });

        if (!chat) {
            // console.error("Chat not found for id:", chatId);
            return res.status(404).json({ message: "Chat not found!" });
        }

   

        // ✅ Sort messages manually if `orderBy` is causing issues
        chat.messages = chat.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // ✅ Ensure `seenBy` does not duplicate userId
        const updatedSeenBy = Array.from(new Set([...chat.seenBy, tokenUserId]));

        await prisma.chat.update({
            where: { id: chatId },
            data: { seenBy: updatedSeenBy },
        });

        // console.log("Chat updated successfully");
        return res.status(200).json(chat);
    } catch (error) {
        console.error("Error in getChat:", error);
        return res.status(500).json({ message: "Failed to get chat!", error: error.message });
    }
};


//Add Chat

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    const receiverId = req.body.receiverId;

    try {
        // Check if a chat already exists between the two users
        const existingChat = await prisma.chat.findFirst({
            where: {
                AND: [
                    { userIds: { has: tokenUserId } },
                    { userIds: { has: receiverId } }
                ]
            }
        });

        if (existingChat) {
            // If chat already exists, return it
            return res.status(200).json(existingChat);
        }

        // If no existing chat, create a new one
        const newChat = await prisma.chat.create({
            data: {
                userIds: [tokenUserId, receiverId]
            }
        });

        return res.status(200).json(newChat);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add chat!" });
    }
};


//Read Chat
export const readChat=async(req,res)=>{
    const tokenUserId=req.userId;

    try {
        const chat=await prisma.chat.update({
            where:{
                id:req.params.id,
                userIds:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }
        })
        return res.status(500).json(chat);
  
    } catch (error) {
        return res.status(500).json({message:"failed to read chat!"})
    }
}