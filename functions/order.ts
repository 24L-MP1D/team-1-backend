import { Response, Request } from "express";
import Order from "../models/order";
import Product from "../models/product";
import Admin from "../models/admin";
import User from "../models/user";

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

export const addToOrder = async (req: Request, res: Response) => {
  const {
    coupon,
    phoneNumber,
    deliveryDate,
    description,
    amountPaid,
    orderType,
    details,
  } = req.body;

  try {
    const token = req.headers["authtoken"];
    const userId = jwt.decode(token).id;
    for (let i in details) {
      updateProductDBOnOrder(details[i]);
    }

    Order.create({
      status: "Ordered",
      phoneNumber,
      deliveryDate,
      amountPaid,
      coupon,
      description,
      orderType,
      details,
      userId,
    });
    res.json("success");
  } catch (e) {
    console.error(e);
    res.json("something gone wrong");
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authtoken"];
    const userId = jwt.decode(token).id;
    const isAdmin = await Admin.findById(userId);
    const isClient = await User.findById(userId);
    if (isAdmin) {
      const data = await Order.find();
      res.status(200).send(data);
    }
    if (isClient) {
      const data = await Order.find({ userId });
      res.status(200).send(data);
    }
    console.log(isAdmin);
  } catch (e) {
    console.error(e);
  }
};

// handy functions

export const updateProductDBOnOrder = async (detail: any) => {
  const item = await Product.findById(detail.id);
  console.log({ originalItem: JSON.stringify(item, null, 2) });

  if (item) {
    const newSizes = item.sizes; // Get the existing sizes

    // Find the specific size (make sure to use the correct case)
    const sizeItem = newSizes.find((s) => s.Name === detail.size); // Use lowercase 'name'

    if (sizeItem) {
      sizeItem.qty += detail.amount; // Deduct the amount

      // Update the product with the modified sizes array
      const updatedProduct = await Product.findByIdAndUpdate(
        detail.id,
        { $set: { sizes: newSizes } },
        { new: true, runValidators: true } // Options to return the updated doc
      );
    } else {
      console.log("Size not found");
    }
  } else {
    console.log("Product not found");
  }
};
