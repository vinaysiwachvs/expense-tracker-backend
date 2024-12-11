import mongoose from 'mongoose';

export interface IUser {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	total_budget: number;
	total_expense: number;
	forgot_password?: boolean;
	is_logged_in?: boolean;
	token?: string;
	category: { _id: string | mongoose.Types.ObjectId }[];
	expense: { _id: string | mongoose.Types.ObjectId }[];
	budget: { _id: string | mongoose.Types.ObjectId }[];
	created_at?: Date;
	updated_at?: Date;
}
