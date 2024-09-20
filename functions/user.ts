import { Request, Response } from "express";
import User from "../models/user";

const bcrypt = require("bcryptjs");
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");

export const createUser = (req: Request, res: Response) => {
  const {
    name,
    email,
    password
  }: { name: string; email: string; password: string } = req.body;
  console.log(name, email, password);

  try {
    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPass = bcrypt.hashSync(password, salt);
    const cartId = uuid();
    console.log(cartId);
    User.create({
      userName: name,
      email: email,
      phoneNumber: 0,
      password: hashedPass,
      address: "",
      zipCode: 0,
      cartId: cartId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return res.send("success");
  } catch (error) {
    console.error("error: ", error);
  }
};

export const checkUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  let isAutenticated = true;

  try {
    console.log(User.findOne(email));

    if (isAutenticated) {
      const token = jwt.sign({ email }, "Secret Key", {
        expiresIn: "1h"
      });
      return res.json(token);
    } else {
      return res.sendStatus(401);
    }
    res.json();
  } catch (error) {
    console.error("error on checking user:   ", error);
  }
};
