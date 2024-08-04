import { Router } from "express"
import { getUserInfo, login, signup } from "../controllers/AuthControllers.js"
import { verifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router()

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info",verifyToken, getUserInfo)

export default authRoutes; 