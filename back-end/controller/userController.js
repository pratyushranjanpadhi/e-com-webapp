import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//User Authentication
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

//User Registration
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
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid User data");
   }
});

//Get the User Profile
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      res.json({
         id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("user not found");
   }
});

//Update the user Profile
const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.user.password) {
         user.password = req.user.password;
      }

      const updatedUser = await user.save();
      res.json({
         id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id),
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

//Get all the users ( admin access )
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({});
   res.json(users);
});

//Delete a user By ID (admin access)
const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   if (user) {
      user.remove();
      res.json({ message: "Successfully Deleted" });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

//Get User By Id (admin access)
const getUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   if (user) {
      res.json(user);
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

//update user provided by id (admin access)
const updateUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select("-password");
   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();
      res.json({
         id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

export {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUserById,
};
