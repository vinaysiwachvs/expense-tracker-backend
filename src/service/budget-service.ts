import { IUser } from './../interface/user';
import { IBudget } from '../interface/budget';
import Budget from '../model/budget';
import UserService from './user-service';
import CategoryService from './category-service';

export default class BudgetService {
	private _userService = new UserService();
	private _categoryService = new CategoryService();

	private async _save(budgetInput: IBudget, isNew: boolean = true): Promise<IBudget> {
		const budget = new Budget(budgetInput);
		budget.isNew = isNew;
		return (await budget.save()).toObject();
	}

	public async getByUser(user: IUser): Promise<IBudget[]> {
		return await Budget.find({ _id: { $in: user.budget } }).lean();
	}

	public async get(): Promise<IBudget[]> {
		return await Budget.find({}).lean();
	}

	public async getById(id: string): Promise<IBudget> {
		const budget = await Budget.findById(id).lean();
		if (!budget) {
			throw new Error('Budget not found');
		}
		return budget;
	}

	public async getByName(user: IUser, name: string): Promise<IBudget> {
		const budget = await Budget.findOne({ name, created_by: user._id }).lean();
		if (!budget) {
			throw new Error('Budget not found');
		}
		return budget;
	}

	public async getByCategoryAndUser(user: IUser, category: string): Promise<IBudget> {
		const budget = await Budget.findOne({ category, created_by: user._id }).lean();
		if (!budget) {
			throw new Error('Budget not found');
		}
		return budget;
	}

	public async create(user: IUser, name: string, category: string, total_amount: number): Promise<string> {
		const fullCategory = await this._categoryService.getByName(user, category);
		const budgetInput: IBudget = {
			name,
			category: fullCategory._id as string,
			total_amount,
			used_amount: 0,
			created_by: user._id as string,
			updated_by: user._id as string,
		};

		const budget = await this._save(budgetInput, true);
		await this._userService.addBudget(user._id as string, budget);
		return budget._id as string;
	}

	public async update(user: IUser, id: string, total_amount: number): Promise<void> {
		const budget = await this.getById(id);
		await this._userService.removeBudget(user._id as string, budget._id as string, budget.total_amount);
		budget.total_amount = total_amount;
		budget.updated_by = user._id as string;
		await this._userService.addBudget(user._id as string, budget);
		await this._save(budget, false);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		const budget = await this.getById(id);
		await this._userService.removeBudget(user._id as string, budget._id as string, budget.total_amount);
		await Budget.findByIdAndDelete(id);
	}

	public async updateUsedAmount(user: IUser, budget: IBudget, used_amount: number): Promise<void> {
		budget.used_amount += used_amount;
		budget.updated_by = user._id as string;
		await this._save(budget, false);
	}
}
