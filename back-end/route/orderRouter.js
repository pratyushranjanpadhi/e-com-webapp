import express from "express";
import { addOrderItems, getOrderDetails, getMyOrders, updateOrderToPaid } from "../controller/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(auth, addOrderItems);
router.route("/myorders").get(auth, getMyOrders);
router.route("/:id").get(auth, getOrderDetails);
router.route("/:id/pay").put(auth, updateOrderToPaid);

export default router;
