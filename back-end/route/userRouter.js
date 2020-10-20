import express from "express";
import { authUser, registerUser, getUserProfile } from "../controller/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(auth, getUserProfile);

export default router;
