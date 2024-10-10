import { Router } from "express";
import { checkUser, createUser, editUser } from "../functions/user";

const userRouter = Router();

userRouter.post("/user/create", createUser);

userRouter.post("/user/login", checkUser);

userRouter.put("/user/edit", editUser);

export default userRouter;
