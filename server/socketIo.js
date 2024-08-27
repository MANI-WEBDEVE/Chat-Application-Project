import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const [userId, socketID] of userSocketMap.entries()) {
      if (socketID === socket.id) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnect from socket map`);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);
    console.log(`recipientSocketId ${recipientSocketId}`)
    console.log(`senderSocketId ${senderSocketId}`)

    const createMessage = await Message.create(message);
    console.log(`createMessage: ${createMessage}`)

    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    console.log(`messageData: ${message.contact}`)
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log(`User ID not provided during connection`);
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => disconnect(socket));

    // Example: Checking protocol version (assuming you want to log or handle it)
    if (socket.conn?.protocol === 4) {
      console.log(`Socket connection using protocol version 4`);
    } else {
      console.log(`${socket.conn.protocol}`)
      console.log("Connection another use")
    }
  });
};

export default setupSocket;
