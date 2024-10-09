import { Request, Response } from 'express';
import Income from '../models/IncomeModel';
import Admin from "../models/admin";
import User from "../models/user";
import Order from '../models/order';
const jwt = require("jsonwebtoken");

const getIncomes = async (req: Request, res: Response) => {
  try {

    const token = req.headers["authtoken"] || "";
    console.log("Received Token:", token);
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded: any = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded?.id;
    const isAdmin = await Admin.findById(userId);
    const isClient = await User.findById(userId);

    console.log("isAdmin:", isAdmin);
    console.log("isClient:", isClient);

    if (!isAdmin && !isClient) {
      return res.status(403).json({ error: "Access denied" });
    }

    const incomes = await Order.find({status: "Shipped"});
    return res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const createIncome = async (req: Request, res: Response) => {
  try {
    const incomeData = req.body;

    if (!incomeData.orderId || !incomeData.userId || !incomeData.amount || !incomeData.date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const income = new Income(incomeData);
    await income.save();
    return res.status(201).json(income);
  } catch (error) {
    console.error("Error creating income:", error);
    return res.status(400).json({ error: "Failed to create income" });
  }
};

export { getIncomes, createIncome };
