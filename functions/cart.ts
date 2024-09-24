import { Router, Request, Response } from 'express';
import CartItem from '../models/CartItem';

const router = Router();

router.post('/add-to-cart', async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem = await CartItem.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId, productId, quantity });
      await cartItem.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});


router.get('/cart/:userId', async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
});

export default router;
