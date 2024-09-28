import { Response, Request } from "express";
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

