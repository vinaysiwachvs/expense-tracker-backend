import { getByName } from './../handler/category-handler';
import { IUser } from './../interface/user';
import { ICategory } from '../interface/categroy';
import CategoryService from '../service/category-service';

export default class CategoryController {
	private _categoryService = new CategoryService();

	public async getByUser(user: IUser): Promise<ICategory[]> {
		return await this._categoryService.getByUser(user);
	}

	public async get(): Promise<ICategory[]> {
		return await this._categoryService.get();
	}

	public async getById(id: string): Promise<ICategory> {
		return await this._categoryService.getById(id);
	}

	public async getByName(user: IUser, name: string): Promise<ICategory> {
		return await this._categoryService.getByName(user, name);
	}

	public async create(user: IUser, name: string): Promise<string> {
		return await this._categoryService.create(user, name);
	}
}
