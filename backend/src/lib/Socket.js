import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Use Map instead of plain object
const userSocketMap = new Map();

export function getReceiverSocketId(userId) {
  return userSocketMap.get(userId);
}

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  // Use auth for userId
  const userId = socket.handshake.auth?.userId;

  if (userId) {
    userSocketMap.set(userId, socket.id);
  }

  // Emit updated online users list
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId) {
      userSocketMap.delete(userId);
    }
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
