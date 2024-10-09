import { Router } from 'express';
import { getIncomes, createIncome } from '../../controller/IncomeController';

const IncomeRouter = Router();

IncomeRouter.get("/income", getIncomes);
IncomeRouter.post("/income", createIncome);

export default IncomeRouter;
