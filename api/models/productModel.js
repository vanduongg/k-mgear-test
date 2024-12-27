const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
