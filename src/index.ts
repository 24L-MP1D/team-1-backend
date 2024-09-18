import Blog from "../models/blog";
import User from "../models/user";
import { createProduct, getProducts } from "../functions/product";
import connectDB from "../db";

connectDB();

// src/index.ts
const express = require("express");

// express
const app = express();
//body parser

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/user/create", async (req: any, res: any) => {
  const user = await User.create({
    name: "Jesse Hall",
    email: "jesse@email.com",
  });

  res.json(user);
});

app.post("/product/create", createProduct);

app.get("/product/list", getProducts);

app.get("/list", async (req: any, res: any) => {
  const firstArticle = await Blog.find({});
  res.json(firstArticle);
});

app.get("/", async (req: any, res: any) => {
  res.json("success");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
