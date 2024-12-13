import User from "../models/AuthModel.js";
import Channel from "../models/ChannelModel.js";

export const createChannel = async (request, response) => {
    try {
        const {name, members} = request.body;
        const userId = request.userId;

        const admin = await User.findById(userId);

        if(!admin) {
            return response.status(404).json({ error: "User not found" });
        }

        const validMembers = await User.find({ _id: { $in: members } });

        if (validMembers.length !== members.length) {
            return response.status(400).json({ error: "Invalid members" });
        }

        const newChannel = new Channel.create({
            name,
            members,
            admin: userId
        });

        await newChannel.save();


        return response.status(201).json({channel: newChannel});
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}