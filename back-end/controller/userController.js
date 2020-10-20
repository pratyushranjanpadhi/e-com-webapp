import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
         id: user._id,
         name: user.name,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(401);
      throw new Error("Email and Password are not valid");
   }
});

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const userExist = await User.findOne({ email });

   if (userExist) {
      res.status(400);
      throw new Error("User already exist");
   }

   const user = await User.create({
      name,
      email,
      password,
   });

   if (user) {
      res.status(201).json({
         id: user._id,
         name: user.name,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid User data");
   }
});

const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      res.json({
         id: user._id,
         name: user.name,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("user not found");
   }
});

export { authUser, registerUser, getUserProfile };
