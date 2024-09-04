import Message from "../models/MessageModel.js";

export const getMessage = async (request, response, next) => {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;

    if (!user1 || !user2) {
      return response.json(
        { message: "Both User id are required" },
        { status: 400 }
      );
    } 

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });
    return response.status(200).json({messages});
  } catch (error) {
    console.log(`Somethin Internal Server Error: ${error.message}`);
    return response.status(500).send("Internal Server Error")
  }
};
