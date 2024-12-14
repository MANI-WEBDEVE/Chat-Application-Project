import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";

export const getChannels = async (request, response) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId)
        
        // Find all channels where the user is a member
        const channels = await Channel.find(
            { members: userId }
        ).populate('admin', 'email firstName lastName image color')
         .populate('members', 'email firstName lastName image color')
         .sort({ updatedAt: -1 });

        // const channels = await Channel.find({
        //     $or: [{admin:userId}, {members:userId}],
        // }).sort({updatedAt: -1})


        return response.status(200).json({ channels });
    } catch (error) {
        console.error('Error fetching channels:', error);
        return response.status(500).json({ 
            error: "Failed to fetch channels",
            details: error.message 
        });
    }
};
