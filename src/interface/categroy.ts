import mongoose from 'mongoose';

export interface ICategory {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	created_by: string | mongoose.Types.ObjectId;
	created_at?: Date;
	updated_by: string | mongoose.Types.ObjectId;
	updated_at?: Date;
}
