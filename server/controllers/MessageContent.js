import Message from "../models/MessageModel.js";

/**
 * Get all messages between two users
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 */
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
