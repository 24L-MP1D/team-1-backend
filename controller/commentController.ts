import { Router } from "express";
import checkToken from "../functions/checkToken";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
} from "../functions/comment";

const commentRouter = Router();

commentRouter
  .post("/comment/create", checkToken, createComment)
  .get("/comment/getByProdId", checkToken, getComment)
  .delete("/comment/delete", checkToken, deleteComment)
  .put("/comment/edit", checkToken, editComment);

export default commentRouter;
