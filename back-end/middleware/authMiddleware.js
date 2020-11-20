import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
const auth = asyncHandler(async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
         token = req.headers.authorization.split(" ")[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.id).select("-password");
         next();
      } catch (error) {
         console.error(error);
         res.status(401);
         throw new Error("Token not found, Not authorized");
      }
   }
   if (!token) {
      res.status(401);
      throw new Error("Token not found, not authorized");
   }
});

const authAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401);
      throw new Error("You are not an admin, only admins are allowed");
   }
};

export { auth, authAdmin };
