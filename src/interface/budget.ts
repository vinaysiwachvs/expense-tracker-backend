import mongoose from 'mongoose';

export interface IBudget {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	category: string | mongoose.Types.ObjectId;
	total_amount: number;
	used_amount: number;
	created_by: string | mongoose.Types.ObjectId;
	created_at?: Date;
	updated_by: string | mongoose.Types.ObjectId;
	updated_at?: Date;
}
