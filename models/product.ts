import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const productSchema = new Schema({
  sizes: [{}],
  productName: String,
  categoryId: String,
  price: Number,
  thumbnails: {
    type: String,
    default: "def",
  },
  images: [String],
  coupon: String,
  salePercent: Number,
  description: {
    type: String,
    default: "no description",
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = model("Product", productSchema);
export default Product;
