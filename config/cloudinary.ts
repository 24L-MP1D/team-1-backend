import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

export const handeleUpload = async (file: string) => {
  const res = await cloudinary.uploader.upload(file, { resource_type: "auto" });
  return res;
};
