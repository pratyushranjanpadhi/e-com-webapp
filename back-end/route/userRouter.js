import express from "express";
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers } from "../controller/userController.js";
import { auth, authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(auth, authAdmin, getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
