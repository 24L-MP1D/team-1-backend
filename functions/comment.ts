import { Request, Response } from "express";
import Comment from "../models/comment";
import { createProduct } from "./admin_functions/product";

const jwt = require("jsonwebtoken");

export const createComment = async (req: Request, res: Response) => {
  const token = req.headers["authtoken"];
  const { productId, comment, rating } = req.body;

  try {
    const userId = jwt.decode(token).id;
    Comment.create({ userId, productId, comment, rating });
    res.status(200).json({ val: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ val: "failed" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  const { productId } = req.query;
  try {
    const query: any = {};
    if (productId) query.productId = productId;
    const data = await Comment.find({ productId });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const token = req.headers["authtoken"];
  const { productId } = req.body;

  try {
    const userId = jwt.decode(token).id;
    await Comment.deleteOne({ userId, productId });
    res.status(200).json({ val: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ val: "failed" });
  }
};

export const editComment = async (req: Request, res: Response) => {
  const token = req.headers["authtoken"];
  const { productId, comment, rating } = req.body;

  try {
    const userId = jwt.decode(token).id;
    const selectedComment = await Comment.findOneAndUpdate(
      {
        productId,
        userId,
      },
      { rating, comment }
    );

    res.status(200).json({ val: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ val: "failed" });
  }
};
