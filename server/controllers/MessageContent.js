import Message from "../models/MessageModel.js";

import {mkdirSync, renameSync} from 'fs';


export const getMessage = async (request, response, next) => {
  try {
    // Get the id of the two users
    const user1 = request.userId;
    const user2 = request.body.id;

    // Check if both user id are present
    if (!user1 || !user2) {
      return response.json(
        { message: "Both User id are required" },
        { status: 400 }
      );
    } 

    // Get all messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    // Return the messages in ascending order
    return response.status(200).json({messages});
  } catch (error) {
    console.log(`Somethin Internal Server Error: ${error.message}`);
    return response.status(500).send("Internal Server Error")
  }
};
export const uploadFiles = async (request, response, next) => {
  try {
    if(!request.file){
      return response.status(400).send("File is required") 
    }
    const date = Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${request.file.originalname}`;

    mkdirSync(fileDir, { recursive: true });
    renameSync(request.file.path, fileName);
    
    return response.status(200).json({filePath: fileName})
    
   
  } catch (error) {
    console.log(`Somethin Internal Server Error: ${error.message}`);
    return response.status(500).send("Internal Server Error")
  }
};
