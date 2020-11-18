import express from "express";
import { addOrderItems, getOrderDetails, updateOrderToPaid } from "../controller/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(auth, addOrderItems);
router.route("/:id").get(auth, getOrderDetails);
router.route("/:id/pay").put(auth, updateOrderToPaid);
export default router;
