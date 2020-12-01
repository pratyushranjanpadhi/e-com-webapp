import express from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/productController.js";
import { auth, authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(auth, authAdmin, createProduct);

router.route("/:id/review").post(auth, createProductReview);

router.route("/:id").get(getProductById).delete(auth, authAdmin, deleteProduct).put(auth, authAdmin, updateProduct);

export default router;
