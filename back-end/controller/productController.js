import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({});
   res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   if (product) {
      res.json(product);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   if (product) {
      product.remove();
      res.json({ message: "Product Deleted" });
   } else {
      res.status(404);
      throw new Error("Product Not found");
   }
});

export { getProducts, getProductById, deleteProduct };
