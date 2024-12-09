import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/user';

const UserSchema: Schema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		total_expense: { type: Number, default: 0 },
		forgot_password: { type: Boolean, default: false },
		is_logged_in: { type: Boolean, default: false },
		token: { type: String },
	},
	{ timestamps: true, collection: 'user' },
);

export default mongoose.model<IUser>('User', UserSchema);
