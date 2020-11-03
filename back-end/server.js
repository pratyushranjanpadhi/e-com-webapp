import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRouter from "./route/productRouter.js";
import userRouter from "./route/userRouter.js";
import orderRouter from "./route/orderRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello to the home screen");
});

app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);
app.use("/api/orders/", orderRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("server is up on 8080"));
