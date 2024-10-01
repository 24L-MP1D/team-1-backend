import Product from "../../models/product";
import { Response, Request } from "express";
import savedItem from "../..//models/saved";

const jwt = require("jsonwebtoken");

export const createProduct = (req: Request, res: Response) => {
  try {
    const prod = Product.create(req.body);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
