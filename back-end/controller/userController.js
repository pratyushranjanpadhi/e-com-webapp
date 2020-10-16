import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
         id: user._id,
         name: user.name,
         isAdmin: user.isAdmin,
         token: null,
      });
   } else {
      res.status(401);
      throw new Error("Email and Password are not valid");
   }
});

export { authUser };
