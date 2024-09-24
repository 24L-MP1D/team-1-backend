import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const savedSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
    required: true
  }
});

const savedItem = model("savedItem", savedSchema);
export default savedItem;
