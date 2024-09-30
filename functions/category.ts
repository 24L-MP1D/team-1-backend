import { Request, Response } from "express";
import Product from "../models/product";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categrories = await Product.find({}).select("categoryId");
    console.log(categrories);
  } catch (e) {
    console.error(e);
  }
};
