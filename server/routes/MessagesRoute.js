import { Router } from "express"
import { verifyToken } from "../middleware/AuthMiddleware.js"
import { getMessage, uploadFiles } from "../controllers/MessageContent.js"
import multer from 'multer'
const messageRoute = Router()
const uploads = multer({ dest: 'uploads/files' })


messageRoute.post('/get-messages', verifyToken, getMessage)
messageRoute.post("/upload-file", verifyToken, uploads.single("file"), uploadFiles )


export default messageRoute