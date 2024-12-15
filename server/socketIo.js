import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";
import Channel from "./models/ChannelModel.js";

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
    if (message.length === 0) {
      return console.log("Message is empty");
    }
    const createMessage = await Message.create(message);
    console.log(`createMessage: ${createMessage}`) 

    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    console.log(`messageData: ${messageData}`)
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const createChannelMessage = async (message) => {
    const {channelId, sender, contact, messageType, fileUrl} = message;

    const createMessage = await Message.create({
      sender,
      recipient: null,
      contact,
      messageType,
      fileUrl,
      channelId,
      timeStamp: new Date()
    });

    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "id email firstName lastName image color");

    await Channel.findByIdAndUpdate(channelId, {$push: {messages: createMessage._id}});

    const channel = await Channel.findById(channelId).populate("members");

    const finalData = {...messageData._doc, channelId: channel._id};

    // Create a Set to store unique socket IDs
    const sentToSocketIds = new Set();

    if (channel && channel.members) {
      // Add member socket IDs to the set
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId && !sentToSocketIds.has(memberSocketId)) {
          sentToSocketIds.add(memberSocketId);
          io.to(memberSocketId).emit("recieve-channel-message", finalData);
        }
      });

      // Only send to admin if they haven't received the message as a member
      const adminSocketId = userSocketMap.get(channel.admin.toString());
      if (adminSocketId && !sentToSocketIds.has(adminSocketId)) {
        io.to(adminSocketId).emit("recieve-channel-message", finalData);
      }
    }
}





  io.on("connection", (socket) => {
  console.log(userSocketMap) 
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log(`User ID not provided during connection`);
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", createChannelMessage);
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
