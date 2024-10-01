import { Response, Request, NextFunction } from "express";
import Admin from "../../models/admin";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const createNewAdmin = (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPass = bcrypt.hashSync(password, salt);
    Admin.create({ email, password: hashedPass, name });
    res.json("success");
  } catch (e) {
    console.error(e);
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select({ password: 1 });
    if (!admin) {
      return res.sendStatus(401).json("");
    }
    const isAutenticated = bcrypt.compareSync(password, admin?.password);
    if (isAutenticated) {
      const token = jwt.sign({ email, id: admin.id }, process.env.secretKey, {
        expiresIn: "3h",
      });
      return res.json(token);
    } else {
      return res.sendStatus(401).json("");
    }
    res.json();
  } catch (e) {
    console.error(e);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authtoken"];
  const adminId = jwt.decode(token).id;
  const isAdmin = await Admin.findById(adminId);

  if (isAdmin) {
    next();
  } else {
    res.status(401).send("non valid token");
  }
};
