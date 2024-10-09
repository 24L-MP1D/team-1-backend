import {
  fetchSavedProduct,
  getProducts,
  saveProduct,
  unsaveProduct
} from "../functions/product";

import { createProduct } from "../functions/admin_functions/product";

import { getCategories } from "../functions/category";

import {
  checkAdmin,
  createNewAdmin,
  loginAdmin
} from "../functions/admin_functions/adminAccout";

import { addToOrder, getOrders } from "../functions/order";

import { checkUser, createUser, findUser } from "../functions/user";
import connectDB from "../db";
import checkToken from "../functions/checkToken";

import { uploadRouter } from "../functions/Routers/uploadRouter";

import cartRouter from "../functions/cart";
import IncomeRouter from "../functions/Routers/IncomeRouter";

connectDB();

const express = require("express");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3001"
  })
);

app.use(express.json());

app.use(uploadRouter);

app.use(cartRouter);
app.use(IncomeRouter);

// admin

app.post("/admin/create", createNewAdmin);

app.post("/admin/login", loginAdmin);

// admin end

app.get("/product/category/list", getCategories);

app.post("/product/create", checkAdmin, createProduct);

app.post("/product/list", getProducts);

app.post("/user/create", createUser);

app.get("/user/get", findUser);

app.post("/user/login", checkUser);

app.post("/product/save", checkToken, saveProduct);

app.post("/product/unsave", checkToken, unsaveProduct);

app.get("/product/getSaved", checkToken, fetchSavedProduct);

app.post("/order/create", checkToken, addToOrder);

app.post("/order/get", checkToken, getOrders);


// app.put("/saved/create", )

// app.get("/list", async (req: any, res: any) => {
//   const firstArticle = await Blog.find({});
//   res.json(firstArticle);
// });

// app.get("/", async (req: any, res: any) => {
//   res.json("success");
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
