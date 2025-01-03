import mongoose, { Schema } from 'mongoose';
import { IBudget } from '../interface/budget';

const BudgetSchema = new Schema<IBudget>(
	{
		name: { type: String, required: true, unique: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		total_amount: { type: Number, required: true },
		used_amount: { type: Number, required: true, default: 0 },
		created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		created_at: { type: Date, default: Date.now, immutable: true },
		updated_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		updated_at: { type: Date, default: Date.now },
	},
	{
		collection: 'budget',
	},
);

export default mongoose.model<IBudget>('Budget', BudgetSchema);
