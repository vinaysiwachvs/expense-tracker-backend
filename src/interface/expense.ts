import mongoose from 'mongoose';

export interface IExpense {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	amount: number;
	budget: string | mongoose.Types.ObjectId;
	created_by: string | mongoose.Types.ObjectId;
	created_at?: Date;
	updated_by: string | mongoose.Types.ObjectId;
	updated_at?: Date;
}
