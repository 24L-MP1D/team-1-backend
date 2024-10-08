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
    details
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
      userId
    });
    res.json("success");
  } catch (e) {
    console.error(e);
    res.json("something gone wrong");
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { status, orderType, maxAmount, minAmount, deliveryDate, minDeliveryDate, maxDeliveryDate }: 
        { status?: string | null; orderType?: string; maxAmount?: number; minAmount?: number; deliveryDate?: Date; minDeliveryDate?: Date; maxDeliveryDate?: Date; } = req.body;

  try {
    const token = req.headers["authtoken"];
    const decodedToken = jwt.decode(token) as { id: string };
    const userId = decodedToken.id;

    const isAdmin = await Admin.findById(userId);
    const isClient = await User.findById(userId);

    // Create a query object based on filters provided
    const query: any = {};

    if (status) {
      query.status = status;
    }
    if (orderType) {
      query.orderType = orderType;
    }
    if (minAmount !== undefined) {
      query.amountPaid = { ...query.amountPaid, $gte: minAmount }; // Greater than or equal to
    }
    if (maxAmount !== undefined) {
      query.amountPaid = { ...query.amountPaid, $lte: maxAmount }; // Less than or equal to
    }
    if (deliveryDate) {
      query.deliveryDate = new Date(deliveryDate); // Convert to Date object
    }
    if (minDeliveryDate) {
      query.deliveryDate = { ...query.deliveryDate, $gte: new Date(minDeliveryDate) }; // Greater than or equal
    }
    if (maxDeliveryDate) {
      query.deliveryDate = { ...query.deliveryDate, $lte: new Date(maxDeliveryDate) }; // Less than or equal
    }


    if (isAdmin) {
      const data = await Order.find(query); // Fetch all orders with filters for admin
      return res.status(200).json(data);
    }

    if (isClient) {
      query.userId = userId; // Add userId filter for client
      const data = await Order.find(query); // Fetch client's orders with filters
      return res.status(200).json(data);
    }

    return res.status(403).json({ message: 'Access denied' }); // Handle unauthorized access
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' }); // Handle server errors
  }
};

// handy functions

export const updateProductDBOnOrder = async (detail: any) => {
  const item = await Product.findById(detail.id);
  console.log({ originalItem: JSON.stringify(item, null, 2) });

  if (item) {
    const newSizes = item.sizes; // Get the existing sizes

    // Find the specific size (make sure to use the correct case)
    const sizeItem = newSizes.find(s => s.Name === detail.size); // Use lowercase 'name'

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
