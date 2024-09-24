import mongoose from "mongoose";
const { Schema, model, SchemaType } = mongoose;

const savedSchema = new Schema({
  userId: String,
  productId: String
});

const savedItem = model("savedItem", savedSchema);
export default savedItem;
