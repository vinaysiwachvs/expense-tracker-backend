import mongoose from 'mongoose';

export interface IUser {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	expenses?: string[] | mongoose.Types.ObjectId[];
	forgot_password?: boolean;
	is_logged_in?: boolean;
	token?: string;
}
