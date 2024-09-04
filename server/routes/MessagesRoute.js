import { Router } from "express"
import { verifyToken } from "../middleware/AuthMiddleware.js"
import { getMessage } from "../controllers/MessageContent.js"

const messageRoute = Router()

messageRoute.post('/get-messages', verifyToken, getMessage)



export default messageRoute