import { Router } from "express";
import checkToken from "../functions/checkToken";
import { addToOrder, getOrders } from "../functions/order";

const orderRouter = Router();

orderRouter.post("/order/create", checkToken, addToOrder);

orderRouter.post("/order/get", checkToken, getOrders);

export default orderRouter;
