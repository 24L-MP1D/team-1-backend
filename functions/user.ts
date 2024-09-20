import { Request, Response } from "express";
import User from "../models/user";

var bcrypt = require("bcryptjs");

export const createUser = (req: Request, res: Response) => {
  const {
    name,
    username,
    password
  }: { name: string; username: string; password: string } = req.body;
  console.log(name, username, password);

  try {
    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPass = bcrypt.hashSync(password, salt);

    return res.send("success");
  } catch (error) {
    console.error(error);
  }
};
