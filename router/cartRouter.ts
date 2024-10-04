import { Router } from 'express';
import express from "express";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  getCart,
} from '../controller/CartController'; 
//import { authenticate } from '../middleware/authMiddleware';

const cartRouter = Router();

cartRouter.get('/:userId', authenticate, getCart)
.post('/product/:id', authenticate, addItemToCart)
.put('/checkout', authenticate, updateItemQuantity)
.delete('/checkout', authenticate, removeItemFromCart);

export default cartRouter;
