import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export default function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authtoken = req.headers["authtoken"];

  if (!authtoken) {
    res.sendStatus(403);
  }
  if (!jwt.verify(authtoken + "", process.env.secretKey)) {
    res.sendStatus(403);
  }
  next();
}
