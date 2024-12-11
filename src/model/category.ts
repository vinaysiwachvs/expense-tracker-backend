import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interface/categroy';

const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true },
		created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		created_at: { type: Date, default: Date.now, immutable: true },
		updated_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		updated_at: { type: Date, default: Date.now },
	},
	{
		collection: 'category',
	},
);

export default mongoose.model<ICategory>('Category', CategorySchema);
