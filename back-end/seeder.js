import mongoose from "mongoose";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import colors from "colors";

dotenv.config();
connectDB();

const insertData = async () => {
   try {
      await Order.deleteMany();
      await User.deleteMany();
      await Product.deleteMany();

      const insertedUsers = await User.insertMany(users);
      const adminUser = insertedUsers[0]._id;
      const sampleProduct = products.map((product) => {
         return {
            ...product,
            user: adminUser,
         };
      });
      await Product.insertMany(sampleProduct);
      console.log("Data Inserted ".green.bold);
      process.exit();
   } catch (error) {
      console.error(error.message);
      process.exit(1);
   }
};

const clearData = async () => {
   try {
      await Order.deleteMany();
      await User.deleteMany();
      await Product.deleteMany();

      console.log("Data Cleared ".red.bold);
      process.exit();
   } catch (error) {
      console.error(error.message);
      process.exit(1);
   }
};

if (process.argv[2] === "-c") {
   clearData();
} else {
   insertData();
}
