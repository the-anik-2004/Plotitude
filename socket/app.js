import { Server } from "socket.io";
import express from "express";
import http from "http";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
  cors: {
    origin: "https://plotitude.onrender.com", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies, etc.)
  },
});

let onlineUsers = {}; // Use an object to map userId to an array of socketIds

// Helper functions for managing online users
const addUser = (userId, socketId) => {
  if (!onlineUsers[userId]) {
    onlineUsers[userId] = [];
  }
  // Avoid adding duplicate socketId for the same user
  if (!onlineUsers[userId].includes(socketId)) {
    onlineUsers[userId].push(socketId);
  }
};

const getUser = (userId) => {
  return onlineUsers[userId];
};

const removeUser = (socketId) => {
  for (const userId in onlineUsers) {
    onlineUsers[userId] = onlineUsers[userId].filter((id) => id !== socketId);
    if (onlineUsers[userId].length === 0) {
      delete onlineUsers[userId]; // Remove user from the map if no socketIds remain
    }
  }
};

const broadcastMessage = (receiverId, data) => {
  const receiver = getUser(receiverId);
  if (receiver && receiver.length > 0) {
    receiver.forEach((socketId) => {
      io.to(socketId).emit("getMessage", data);
    });
    console.log(`Message sent to ${receiverId}: ${data}`);
  } else {
    console.log(`Receiver ${receiverId} not found online.`);
  }
};

// Socket.IO connection and events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Add new user to the online users list
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`New user added: ${userId}, Socket ID: ${socket.id}`);
  });

  // Handle incoming messages from clients
  socket.on("sendMessage", ({ receiverId, data }) => {
    broadcastMessage(receiverId, data);
  });

  // Clean up user data when they disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

// Health check route for debugging
app.get("/socket-status", (req, res) => {
  res.send("Socket.IO server is running");
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Socket.IO server running on port ${PORT}`);
});
