import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sizeSchema = new Schema({
    Name: { type: String, required: true },
    qty: { type: Number, required: true, min: 0 },
});

const cartItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String, required: true },
    availableSizes: [sizeSchema]
});

const cartSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User', unique: true },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

cartSchema.pre('save', function(next) {
  //  this.updatedAt = Date.now();
    next();
});

const Cart = model('Cart', cartSchema);
export default Cart;
