import { Request, Response } from "express";
import Product from "../models/product";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categrories = await Product.distinct("categoryId");
    res.send(categrories);
  } catch (e) {
    console.error(e);
  }
};
