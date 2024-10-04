import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

{/*interface ICartItem extends Document {
  users.id: string;
  productId: string;
  quantity: number;
}
*/}
const cartItemSchema = new Schema({
  users_id: { type: String, required: true },
  product_id: { type: String, required: true },
  qty: { type: Number, default: 1 },
});

const CartItem = model('CartItem', cartItemSchema);

export default CartItem;
