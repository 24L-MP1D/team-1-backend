import mongoose from "mongoose";
const { Types, Schema, SchemaTypes, model } = mongoose;

const orderSchema = new Schema({
  orderNumber: { type: String, default: "" },
  status: {
    type: String,
    enum: ["Ordered", "PreparingToShip", "Shipped", "Delivered"],
  },
  phoneNumber: String,
  deliveryDate: { type: Date, default: null },
  amountPaid: Number,
  coupon: String,
  description: String,
  orderType: { type: String, enum: ["Take Away", "Delivery"] },
  details: [{ id: SchemaTypes.ObjectId, qty: Number, size: String }],
  userId: { type: Types.ObjectId, require: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Order = model("orders", orderSchema);
export default Order;
