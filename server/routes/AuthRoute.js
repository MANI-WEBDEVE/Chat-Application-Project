import { Router } from "express"
import { getUserInfo, login, signup, updateProfile } from "../controllers/AuthControllers.js"
import { verifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router()

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info",verifyToken, getUserInfo)
authRoutes.post("/update-profile", verifyToken, updateProfile)


export default authRoutes; 