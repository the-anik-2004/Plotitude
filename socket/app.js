import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app); // Create HTTP server for Express

const io = new Server(server, {
    cors: {
        origin: "https://plotitude.onrender.com",
        methods: ["GET", "POST"]
    }
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUser.find(user => user.userId === userId);
    if (!userExists) {
        onlineUser.push({ userId, socketId });
    }
};

const getUser = (userId) => {
    return onlineUser.find(user => user.userId === userId);
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter(user => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(`New user added: ${userId}, Socket ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        removeUser(socket.id);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
            console.log(`Message sent to ${receiverId}: ${data}`);
        } else {
            console.log(`Receiver ${receiverId} not found online.`);
        }
    });
});

// ✅ Add a health check route for debugging
app.get("/socket-status", (req, res) => {
    res.send("Socket.IO server is running");
});

// ✅ Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
