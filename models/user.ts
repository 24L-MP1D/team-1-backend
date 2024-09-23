import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
  phoneNumber: String,
  password: String,
  address: String,
  zipCode: Number,
  cartId: String,
  createdAt: Date,
  updatedAt: Date
});

const User = model("User", userSchema);
export default User;
