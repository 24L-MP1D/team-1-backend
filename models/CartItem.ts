import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const cartItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  size: { type: String, require: true },
  qty: { type: Number, default: 1 },
});

const Cart = mongoose.model("CartItem", cartItemSchema);

export default Cart;
