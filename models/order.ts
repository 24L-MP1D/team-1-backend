import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const orderSchema = new Schema({
  orderNumber: String,
  status: {
    type: String,
    enum: ["Ordered", "PreparingToShip", "Shipped", "Delivered"]
  },
  phoneNumber: String,
  deliveryDate: Date,
  amountPaid: Number,
  amoutToBePaid: Number,
  coupon: String,
  description: String,
  orderType: { type: String, enum: ["Take Away", "Delivery"] },
  details: [{}],
  createdAt: Date,
  updatedAt: Date
});

const Order = model("orders", orderSchema);
export default Order;
