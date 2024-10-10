import { Request, Response } from "express";
import Cart from "../models/CartItem";
import fs from "fs";
import path from "path";

const jwt = require("jsonwebtoken");

export const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity, selectedSize, availableSizes } =
    req.body;

  try {
    let cart: any = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, selectedSize, availableSizes });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

export const updateItemQuantity = async (req: Request, res: Response) => {
  const { userId, productId, selectedSize, quantity } = req.body;

  try {
    const cart: any = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.selectedSize === selectedSize
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Item quantity updated", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item quantity" });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId, selectedSize } = req.body;

  try {
    const cart: any = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.selectedSize === selectedSize
        )
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};
