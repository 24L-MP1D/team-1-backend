import {
  checkAdmin,
  createNewAdmin,
  loginAdmin,
} from "../functions/admin_functions/adminAccout";

import connectDB from "../db";

import { uploadRouter } from "../functions/Routers/uploadRouter";
import productController from "../controller/ProductController";
import orderController from "../controller/orderController";

import cartRouter from "../functions/cart";

connectDB();

const express = require("express");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(uploadRouter);

app.use(cartRouter);

app.use(productController);

app.use(orderController);

// admin

app.post("/admin/create", createNewAdmin);

app.post("/admin/login", loginAdmin);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
