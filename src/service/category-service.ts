import { IUser } from './../interface/user';
import Category from '../model/category';
import { ICategory } from '../interface/categroy';
import UserService from './user-service';

export default class CategoryService {
	private _userService = new UserService();

	private _save(categoryInput: ICategory, isNew: boolean = true): Promise<ICategory> {
		const category = new Category(categoryInput);
		category.isNew = isNew;
		return category.save();
	}

	public async getByUser(user: IUser): Promise<ICategory[]> {
		return await Category.find({ _id: { $in: user.category } }).lean();
	}

	public async get(): Promise<ICategory[]> {
		return await Category.find({}).lean();
	}

	public async getById(id: string): Promise<ICategory> {
		const category = await Category.findById(id).lean();
		if (!category) {
			throw new Error('Category not found');
		}
		return category;
	}

	public async getByName(user: IUser, name: string): Promise<ICategory> {
		const category = await Category.findOne({ name, created_by: user._id }).lean();
		if (!category) {
			throw new Error('Category not found');
		}
		return category;
	}

	public async create(user: IUser, name: string): Promise<string> {
		const categoryInput: ICategory = {
			name,
			created_by: user._id as string,
			updated_by: user._id as string,
		};
		const category = await this._save(categoryInput);
		await this._userService.editCategory(user, category);
		return category._id as string;
	}
}
