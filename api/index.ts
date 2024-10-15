import {
  checkAdmin,
  createNewAdmin,
  loginAdmin,
} from "../functions/admin_functions/adminAccout";

import connectDB from "../db";

import { uploadRouter } from "../functions/Routers/uploadRouter";
import productController from "../controller/ProductController";
import orderController from "../controller/orderController";

import { getIncomes } from "../controller/IncomeController";

import userRouter from "../controller/userController";

import cartRouter from "../functions/cart";

import commentRouter from "../controller/commentController";

connectDB();

const express = require("express");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(uploadRouter);

app.use(cartRouter);

app.use(productController);

app.use(orderController);

app.use(userRouter);

app.use(commentRouter);

// admin

app.get("/income", checkAdmin, getIncomes);

app.post("/admin/create", createNewAdmin);

app.post("/admin/login", loginAdmin);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
