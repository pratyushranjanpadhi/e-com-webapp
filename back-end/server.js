import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRouter from "./route/productRouter.js";
import userRouter from "./route/userRouter.js";
import orderRouter from "./route/orderRouter.js";
import uploadRouter from "./route/uploadRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/uploads/", uploadRouter);

app.get("/api/config/paypal", (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads/", express.static(path.join(__dirname, "/uploads/")));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/front-end/build/")));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
   });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("server is up on 8080"));
