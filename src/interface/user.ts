import mongoose from 'mongoose';

export interface IUser {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	total_expense: number;
	forgot_password?: boolean;
	is_logged_in?: boolean;
	token?: string;
}
