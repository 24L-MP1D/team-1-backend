import { Request, Response } from "express";
import User from "../models/user";

export const createUser = (req: Request, res: Response) => {
  try {
    console.log("asd");
  } catch (error) {
    console.error(error);
  }
};
