import mongoose from "mongoose";

const reviwSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
      comment: {
         type: String,
         required: true,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
   },
   {
      timestamp: true,
   }
);

const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      brand: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },
      review: [reviwSchema],
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      numReviews: {
         type: Number,
         required: false,
         default: 0,
      },
   },
   { timestamp: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
