import { Router, Request, Response } from "express";
import CartItem from "../models/CartItem";
import { Schema } from "mongoose";
const { jwtDecode } = require("jwt-decode");

const cartRouter = Router();

cartRouter.post("/add-to-cart", async (req: Request, res: Response) => {
  const { productId, quantity, size } = req.body;
  const token = req.headers["authtoken"] || "";
  const decoded = jwtDecode(token);

  const userId = decoded.id;

  try {
    let cartItem = await CartItem.findOne({ userId, productId, size });

    if (cartItem) {
      cartItem.qty += quantity;
      if (!cartItem.qty) {
        await CartItem.deleteOne({ userId, productId, size });
        return res.status(200).send("successfully deleted");
      }
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        userId,
        productId,
        size,
        qty: quantity
      });
      await cartItem.save();
    }

    // Send response back with success message
    res
      .status(200)
      .json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    // Error handling
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

cartRouter.get("/getCart", async (req: Request, res: Response) => {
  const token = req.headers["authtoken"] || "";
  const decoded = jwtDecode(token);

  const userId = decoded.id;

  try {
    const cartItems = await CartItem.find({ userId }).populate(
      "productId",
      "productName price images"
    );

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items with products:", error);
    res.status(404).json("empty ");
  }
});

cartRouter.delete("/deleteCartItem", async (req: Request, res: Response) => {
  const { productId, size } = req.body;
  try {
    const token = req.headers["authtoken"] || "";
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    await CartItem.deleteOne({ userId, productId, size });
    res.status(200).send("success");
  } catch (e) {
    console.error(e);
    res.status(400).send("not found");
  }
});

export default cartRouter;
