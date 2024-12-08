import { OP_MSG } from './../../node_modules/mongodb/src/cmap/wire_protocol/constants';
import { generateToken } from '../common/utils/token-utils';
import { IUser } from '../interface/user';
import User from '../model/user';
import bcrypt from 'bcrypt';

export default class UserService {
	private async _save(userInput: IUser, isNew: boolean = true): Promise<IUser> {
		const user = new User(userInput);
		user.isNew = isNew;
		return (await user.save()).toObject();
	}

	public async get(): Promise<IUser[]> {
		return User.find().lean();
	}

	public async getById(id: string): Promise<IUser> {
		const user = await User.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	public async create(name: string, email: string, password: string): Promise<{ _id: string; token: string }> {
		const isEmailExist = await this._isEmailExist(email);
		if (isEmailExist) {
			throw new Error('Email already exists');
		}

		const hashedPassword = await this._hashedPassword(password);
		const userInput: IUser = {
			name: name,
			email: email,
			password: hashedPassword,
			expenses: [],
			token: '',
		};

		const user = await this._save(userInput, true);

		const token = await generateToken(user._id as string);

		user.token = token;
		user.is_logged_in = true;
		const savedUser = await this._save(user, false);

		return { _id: savedUser._id as string, token: savedUser.token as string };
	}

	public async login(email: string, password: string): Promise<string> {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('User not found');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid password');
		}
		const token = await generateToken(user._id as string);
		user.is_logged_in = true;
		user.token = token;
		await this._save(user, false);
		return token;
	}

	public async logout(user: IUser): Promise<void> {
		user.is_logged_in = false;
		user.token = '';
		await this._save(user, false);
	}

	private async _hashedPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	private async _isEmailExist(email: string): Promise<boolean> {
		const isExist = await User.findOne({ email }).collation({
			locale: 'en',
			strength: 2,
		});
		return !!isExist;
	}
}
