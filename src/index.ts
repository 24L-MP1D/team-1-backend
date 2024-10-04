import {
  createProduct,
  fetchSavedProduct,
  getProducts,
  saveProduct,
  unsaveProduct
} from "../functions/product";
import { checkUser, createUser } from "../functions/user";
import connectDB from "../db";
import checkToken from "../functions/checkToken";

connectDB();

const express = require("express");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(express.json());

// app.get("/user/create", async (req: any, res: any) => {
//   const user = await User.create({
//     name: "Jesse Hall",
//     email: "jesse@email.com",
//   });

//   res.json(user);
// });

app.post("/product/create", checkToken, createProduct);

app.post("/product/list", getProducts);

app.post("/user/create", createUser);

app.post("/user/login", checkUser);

app.post("/product/save", checkToken, saveProduct);

app.post("/product/unsave", checkToken, unsaveProduct);

app.post("/product/getSaved", checkToken, fetchSavedProduct);

// app.put("/saved/create", )

// app.get("/list", async (req: any, res: any) => {
//   const firstArticle = await Blog.find({});
//   res.json(firstArticle);
// });

// app.get("/", async (req: any, res: any) => {
//   res.json("success");
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
