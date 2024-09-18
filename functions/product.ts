import Product from "../models/product";
import { Response, Request } from "express";

export const createProduct = (req: Request, res: Response) => {
  try {
    const prod = Product.create(req.body);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const {
    size,
    categoryId,
    name,
    id
  }: {
    size: string | null;
    categoryId: string | null;
    name: string | null;
    id: string | null;
  } = req.body;
  try {
    const query: any = {};

    if (size) {
      query.size = { $elemMatch: { Name: size, qty: { $gt: 0 } } };
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (name) {
      query.productName = { $regex: `${name}`, $options: "i" };
    }

    if (id) {
      return res.status(200).json(await Product.findById(id));
    }

    const prods = await Product.find(query);

    return res.status(200).json(prods);
  } catch (error) {
    console.error(error);
  }
};
