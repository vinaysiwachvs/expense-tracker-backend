import mongoose, { Schema } from 'mongoose';
import { IExpense, ExpenseCategoryEnum } from '../interface/expense';

const ExpenseSchema = new Schema(
	{
		name: { type: String, required: true },
		amount: { type: Number, required: true },
		category: { type: String, enum: Object.values(ExpenseCategoryEnum), required: true },
		date: { type: Date, required: true, default: Date.now },
	},
	{
		collection: 'expense',
	},
);

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
