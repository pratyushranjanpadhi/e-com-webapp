import express from "express";
import { deleteProduct, getProductById, getProducts } from "../controller/productController.js";
import { auth, authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById).delete(auth, authAdmin, deleteProduct);

export default router;
