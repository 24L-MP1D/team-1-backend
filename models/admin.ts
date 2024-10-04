import mongoose from "mongoose";

const { Schema, model } = mongoose;

const adminSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const Admin = model("admin", adminSchema);
export default Admin;
