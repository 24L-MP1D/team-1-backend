import { Request, Response } from "express";
import User from "../models/user";

const { jwtDecode } = require("jwt-decode");

const bcrypt = require("bcryptjs");
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");

export const createUser = (req: Request, res: Response) => {
  const {
    name,
    email,
    password
  }: { name: string; email: string; password: string } = req.body;

  try {
    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPass = bcrypt.hashSync(password, salt);
    const cartId = uuid();
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

export const checkUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select({ password: 1 });
  if (!user) {
    return res.sendStatus(401);
  }
  const isAutenticated = bcrypt.compareSync(password, user?.password);
  try {
    if (isAutenticated) {
      const token = jwt.sign({ email, id: user.id }, process.env.secretKey, {
        expiresIn: "3h"
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

export const findUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authtoken"] || "";
    const decoded = jwtDecode(token);

    const id = decoded.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).send({});
    }
    return res.status(200).send(user);
  } catch (e) {
    return res.send(e);
  }
};
export const editUser = async (req: Request, res: Response) => {

  try {
    const token = req.headers["authtoken"] || "";
    const decoded = jwtDecode(token);
    const id = decoded.id;
    
    const {
      userName,
      phoneNumber,
      address,
    } = req.body
    console.log(userName, address, id)
    const user = await User.findByIdAndUpdate({_id: id}, {
      userName,
      phoneNumber,
      address,
    }); 
    res.send(user);
} catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: error });
}}
