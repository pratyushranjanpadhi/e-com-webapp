import express from "express";
import {
   addOrderItems,
   getOrderDetails,
   getMyOrders,
   updateOrderToPaid,
   getAllOrders,
   updateOrderToDelivered,
} from "../controller/orderController.js";
import { auth, authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// url : api/orders
router.route("/").post(auth, addOrderItems).get(auth, authAdmin, getAllOrders);
router.route("/myorders").get(auth, getMyOrders);
router.route("/:id").get(auth, getOrderDetails);
router.route("/:id/pay").put(auth, updateOrderToPaid);
router.route("/:id/deliver").put(auth, authAdmin, updateOrderToDelivered);

export default router;
