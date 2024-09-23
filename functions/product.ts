import Product from "../models/product";
import { Response, Request } from "express";
import savedItem from "../models/saved";

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
    id,
  }: {
    size: [string] | null;
    categoryId: [string] | null;
    name: string | null;
    id: string | null;
  } = req.body;
  try {
    const query: any = {};

    if (size && size.length) {
      query.size = { $elemMatch: { Name: { $in: size }, qty: { $gt: 0 } } };
    }

    if (categoryId && categoryId.length) {
      query.categoryId = { $in: categoryId };
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
    res.status(501).send("idk whaz wrong");
  }
};

export const saveProduct = (req: Request, res: Response) => {
  try {
    savedItem.create(req.body);
    res.send("Success");
  } catch (e) {
    console.error(e);
  }
};

export const unsaveProduct = async (req: Request, res: Response) => {
  try {
    await savedItem.deleteOne(req.body);
    res.send("success");
  } catch (e) {
    console.error(e);
  }
};

export const fetchSavedProduct = async (req: Request, res: Response) => {
  try {
    const items = await savedItem.find(req.body);
    res.json(items);
  } catch (e) {
    console.error(e);
  }
};
