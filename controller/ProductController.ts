import { Router } from "express";
import checkToken from "../functions/checkToken";
import { getCategories } from "../functions/category";
import { createProduct } from "../functions/admin_functions/product";
import { checkAdmin } from "../functions/admin_functions/adminAccout";
import {
  fetchSavedProduct,
  getProducts,
  saveProduct,
  unsaveProduct,
} from "../functions/product";

const productController = Router();

productController.get("/product/category/list", getCategories);

productController.post("/product/create", checkAdmin, createProduct);

productController.post("/product/list", getProducts);

productController.post("/product/save", checkToken, saveProduct);

productController.post("/product/unsave", checkToken, unsaveProduct);

productController.post("/product/getSaved", checkToken, fetchSavedProduct);

export default productController;
