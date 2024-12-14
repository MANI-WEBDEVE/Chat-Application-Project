
import {Router} from 'express'
import {verifyToken} from "../middleware/AuthMiddleware.js"
import { createChannel } from '../controllers/ChannelControllers.js';
import { getChannels } from '../controllers/getChannels.js';
const channelRoutes = Router();


channelRoutes.post("/create-channel", verifyToken, createChannel)
channelRoutes.get("/get-channels", verifyToken, getChannels);

export default channelRoutes;