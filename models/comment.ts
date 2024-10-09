import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, require: true },
  productId: { type: Schema.Types.ObjectId, require: true },
  rating: { type: Number, min: 0, max: 5, require: true },
  comment: { type: String },
});

const Comment = model("Comment", commentSchema);

export default Comment;
