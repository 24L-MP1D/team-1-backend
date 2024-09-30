import { Request, Response } from "express";
import { handeleUpload } from "../config/cloudinary";

export const uploader = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const uploaderRes = await handeleUpload(dataURI);
    res.json(uploaderRes);
  } catch (e) {
    console.error(e);
    res.status(500).send("error uploading file");
  }
};
