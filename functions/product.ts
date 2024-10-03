import Product from "../models/product";
import { Response, Request } from "express";
import savedItem from "../models/saved";

const jwt = require("jsonwebtoken");

export const getProducts = async (req: Request, res: Response) => {
  const {
    size,
    categoryId,
    name,
    id
  }: {
    size: [string] | null;
    categoryId: [string] | null;
    name: string | null;
    id: string | null;
  } = req.body;
  try {
    const query: any = {};

    const token = req.headers["authtoken"];

    if (size && size.length) {
      query.sizes = { $elemMatch: { Name: { $in: size }, qty: { $gt: 0 } } };
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

    if (!jwt.decode(token)) {
      return res.send(
        prods.map(product => ({
          ...product.toObject(),
          isSelected: false
        }))
      );
    }

    const userId = jwt.decode(token).id;

    const savedItems = await savedItem.find({ userId });

    const savedProductIds = new Set(
      savedItems.map(item => item.productId.toString())
    );

    const productsWithSelectionStatus = prods.map(product => ({
      ...product.toObject(),
      isSelected: savedProductIds.has(product._id.toString())
    }));

    console.log(productsWithSelectionStatus);

    return res.status(200).json(productsWithSelectionStatus);
  } catch (error) {
    console.error(error);
    res.status(501).send("idk whaz wrong");
  }
};

export const saveProduct = (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const token = req.headers["authtoken"];
    const userId = jwt.decode(token).id;
    savedItem.create({ productId, userId });
    res.send("Success");
  } catch (e) {
    console.error(e);
  }
};

export const unsaveProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const token = req.headers["authtoken"];
    const userId = jwt.decode(token).id;
    await savedItem.deleteOne({ productId, userId });
    res.send("success");
  } catch (e) {
    console.error(e);
  }
};

export const fetchSavedProduct = async (req: Request, res: Response) => {
  const id = jwt.decode(req.headers["authtoken"]).id;
  try {
    const items = await savedItem.find({ userId: id });
    res.json(items);
  } catch (e) {
    console.error(e);
  }
};
