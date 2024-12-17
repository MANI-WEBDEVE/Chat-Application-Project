import User from "../models/AuthModel.js";
import Channel from "../models/ChannelModel.js";


// export const createChannel = async (request, response) => {
//     try {
//         const {name, members} = request.body;
//         const userId = request.userId;

//         const admin = await User.findById(userId);

//         if(!admin) {
//             return response.status(404).json({ error: "User not found" });
//         }

//         const validMembers = await User.find({ _id: { $in: members } });

//         if (validMembers.length !== members.length) {
//             return response.status(400).json({ error: "Invalid members" });
//         }

//         const newChannel = new Channel.create({
//             name,
//             members,
//             admin: userId,
//             message:[]
//         });

//         await newChannel.save();


//         return response.status(201).json({channel: newChannel});
//     } catch (error) {
//         return response.status(500).json({ error: error.message })
//     }
// }

export const createChannel = async (request, response) => {
    try {
        const {name, members} = request.body;
        const userId = request.userId;

        // Validate input
        if (!name || !members || members.length === 0) {
            return response.status(400).json({ 
                error: "Channel name and at least one member are required" 
            });
        }

        const admin = await User.findById(userId);
        if(!admin) {
            return response.status(404).json({ error: "Admin user not found" });
        }

        // Validate all members exist
        const validMembers = await User.find({ _id: { $in: members } });
        if (validMembers.length !== members.length) {
            return response.status(400).json({ error: "One or more invalid member IDs" });
        }

        // Create channel with admin included in members
        const allMembers = [...new Set([...members, userId])];
        const newChannel = await Channel.create({
            name,
            members: allMembers,
            admin: userId,
            messages: []
        });

        // Populate admin details for response
        const populatedChannel = await Channel.findById(newChannel._id)
            .populate('admin', 'email firstName lastName image color')
            .populate('members', 'email firstName lastName image color');

        return response.status(201).json({ channel: populatedChannel });
    } catch (error) {
        console.error('Channel creation error:', error);
        return response.status(500).json({ 
            error: "Failed to create channel",
            details: error.message 
        });
    }
}


export const getChannelsMessages = async (request, response) => {
    try {
        const {channelId} = request.params;
        const channel = await Channel.findById(channelId).populate({
            path: "messages",
            populate: {
                path:"sender",
                select: "email firstName lastName image color _id"
            }

        })
        if(!channel) {
            return response.status(404).json({ error: "Channel not found" });
        }
        const messages = channel.messages;
        return response.status(200).json({ messages });

     } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}