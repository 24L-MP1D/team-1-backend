import express from "express";
import Multer, { memoryStorage } from "multer";
import { uploader } from "../../controller/uploadController";

const uploadRouter = express.Router();

const storage = memoryStorage();
const multer = Multer({ storage });

uploadRouter.post("/image/upload", multer.single("image"), uploader);

export { uploadRouter };
