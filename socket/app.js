import {Server} from "socket.io";
import express from "express";

const app=express();
const io=new Server({
    cors:{
        origin:"https://plotitude.onrender.com",
    }
});

let onlineUser=[];

const addUser=(userId,socketId)=>{
    const userExists=onlineUser.find(user=>user.userId===userId)
    if(!userExists){
        onlineUser.push({userId,socketId})
    }
}
const getUser=(userId)=>{
    return onlineUser.find(user=>user.userId===userId);
}
const removeUser=(socketId)=>{
   onlineUser=onlineUser.filter((user)=>user.socketId!==socketId);
}

io.on("connection",(socket)=>{
    socket.on("newUser",(userId)=>{
        addUser(userId,socket.id)
        
    });

    socket.on("disconnect",()=>{removeUser(socket.id)})
    
    socket.on("sendMessage",({receiverId,data})=>{
       const receiver=getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage",data)
        
    })
})

io.listen("4000");
app.get("/socket-status", (req, res) => {
    res.send("Socket.IO server is running");
});
