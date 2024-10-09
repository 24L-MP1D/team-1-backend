import { Request, Response } from 'express';
import Income from '../models/IncomeModel';
import Admin from "../models/admin";
import User from "../models/user";

const jwt = require("jsonwebtoken");

// Get all incomes
const getIncomes = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authtoken"];
    
    // Decode the token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded: any = jwt.decode(token);
    const userId = decoded?.id;

    // Check if the user is an admin or client
    const isAdmin = await Admin.findById(userId);
    const isClient = await User.findById(userId);

    if (!isAdmin && !isClient) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Fetch incomes
    const incomes = await Income.find();
    return res.status(200).json(incomes);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Create a new income entry
const createIncome = async (req: Request, res: Response) => {
  try {
    const incomeData = req.body;

    // Validate income data
    if (!incomeData.orderId || !incomeData.userId || !incomeData.amount || !incomeData.date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const income = new Income(incomeData);
    await income.save(); // Save to the database
    return res.status(201).json(income); // Respond with the created income
  } catch (error) {
    return res.status(400).json({ error: "Failed to create income" });
  }
};

export { getIncomes, createIncome };
