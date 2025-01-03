import mongoose, { Schema } from 'mongoose';
import { IExpense } from '../interface/expense';

const ExpenseSchema = new Schema<IExpense>(
	{
		name: { type: String, required: true },
		amount: { type: Number, required: true },
		budget: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
		created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		created_at: { type: Date, default: Date.now, immutable: true },
		updated_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		updated_at: { type: Date, default: Date.now },
	},
	{
		collection: 'expense',
	},
);

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
