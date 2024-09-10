import mongoose from "mongoose";
import User from "../models/AuthModel.js";
import Message from "../models/MessageModel.js";

export const searchContact = async (request, response, next) => {
  try {
    const { searchTerm } = request.body;

    if (searchTerm === undefined || searchTerm === null) {
      return response.status(400).send("searchTerm is Required");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\:;]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: request.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });
    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error }, error.message);
    return response.status(500).send("Internal Server Error");
  }
};

/**
 * Get a list of contacts for the user, sorted by the last message sent between the two users
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 */
export const getContactDMList = async (request, response, next) => {
  try {
    // Get the id of the user from the request
    let { userId } = request;
    console.log("10000000000111111111111111111111111000000000000000000000000111111111111111111111111111110000000000000000000000000011111111111111");

    // Convert the user id to a mongoose ObjectId
    userId = new mongoose.Types.ObjectId(userId);

    /**
     * Use the aggregate pipeline to get the list of contacts for the user
     * $match: Match the sender or recipient of the message is the current user
     * $sort: Sort the messages by the timestamp in descending order
     * $group: Group the messages by the recipient or sender of the message
     * $lookup: Lookup the user document from the "users" collection
     * $unwind: Unwind the contactInfo array to flatten the documents
     * $project: Project only the necessary fields to the client
     * $group: Group the contacts by the user id
     * $sort: Sort the contacts by the last message time in descending order
     */
    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] }, // If the sender is the current user
              then: "$recipient", // Group by the recipient
              else: "$sender", // Otherwise, group by the sender
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id", // _id here is either the recipient or sender based on the $group stage
          foreignField: "_id", // matches the user's _id field
          as: "user", // output array of matched users
        },
      },
      {
        $unwind: "$user", // Unwind the 'user' array to get individual documents
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$user.email", // Use 'user' field instead of 'contactInfo'
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          image: "$user.image",
          color: "$user.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);
    
    // Return the list of contacts to the client
    return response.status(200).json({ contacts });
    
  } catch (error) {
    console.log({ error }, error.message);
    return response.status(500).send("Internal Server Error");
  }
};
