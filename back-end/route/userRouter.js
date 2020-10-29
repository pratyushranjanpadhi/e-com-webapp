import express from "express";
import { authUser, registerUser, getUserProfile, updateUserProfile } from "../controller/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
