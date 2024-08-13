import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthController.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user-info",VerifyToken, getUserInfo)

export default authRoute;
