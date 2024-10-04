import express from "express";
import Multer, { memoryStorage } from "multer";
import { uploader } from "../../controller/uploadController";
import { checkAdmin } from "../admin_functions/adminAccout";

const uploadRouter = express.Router();

const storage = memoryStorage();
const multer = Multer({ storage });

uploadRouter.post(
  "/image/upload",
  checkAdmin,
  multer.single("image"),
  uploader
);

export { uploadRouter };
