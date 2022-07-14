import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
   const pageSize = 8;
   const page = Number(req.query.page) || 1;

   const count = await Product.estimatedDocumentCount();
   const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
   res.send({ products, page, totalPages: Math.ceil(count / pageSize) });
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

const createProduct = asyncHandler(async (req, res) => {
   const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
   });

   const createdProduct = await product.save();
   if (createdProduct) {
      res.status(200).json(createdProduct);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

const updateProduct = asyncHandler(async (req, res) => {
   const { name, price, image, brand, category, countInStock, numReviews, description } = req.body;
   const product = await Product.findById(req.params.id);
   if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.numReviews = numReviews;
      product.description = description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404);
      throw new Error("Produt not found");
   }
});

const createProductReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;
   const product = await Product.findById(req.params.id);
   if (product) {
      const alreadyReviewed = product.review.find(
         (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
         res.json(400);
         throw new Error("You can review only once");
      }

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id,
      };
      product.review.push(review);
      product.numReviews = product.review.length;
      product.rating =
         product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length;

      await product.save();

      res.status(201);
      res.json({ message: "Review Created" });
   } else {
      res.status(404);
      throw new Error("Produt not found");
   }
});

const getTopRatedProduct = asyncHandler(async (req, res) => {
   const products = await Product.find({}).sort({ rating: -1 }).limit(3);
   res.json(products);
});

export {
   getProducts,
   getProductById,
   deleteProduct,
   createProduct,
   updateProduct,
   createProductReview,
   getTopRatedProduct,
};
