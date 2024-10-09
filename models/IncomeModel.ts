// src/models/IncomeModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IIncome extends Document {
  orderId: string;
  userId: string;
  amount: number;
  deliveryDate: Date;
}

const incomeSchema = new Schema<IIncome>({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
});

const Income = mongoose.model<IIncome>('Income', incomeSchema);
export default Income;
