import { Router } from "express";
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
  getProfileImage,
  removeProfileImage,
  logOutRoute
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles/" });
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  getProfileImage
);

authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);

authRoutes.post("/logout-user",verifyToken, logOutRoute)

export default authRoutes;
