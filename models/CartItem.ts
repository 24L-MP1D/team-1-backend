import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

{/*interface ICartItem extends Document {
  users.id: string;
  productId: string;
  quantity: number;
}
*/}
const cartItemSchema = new Schema({
  users._id: { type: String, required: true },
  products._id: { type: String, required: true },
  qty: { type: Number, default: 1 },
});

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);

export default CartItem;
