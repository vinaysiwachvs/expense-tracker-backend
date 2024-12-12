import { IBudget } from '../interface/budget';
import { IUser } from '../interface/user';
import BudgetService from '../service/budget-service';

export default class BudgetController {
	private _budgetService = new BudgetService();

	public async getByUser(user: IUser): Promise<IBudget[]> {
		return await this._budgetService.getByUser(user);
	}

	public async get(): Promise<IBudget[]> {
		return await this._budgetService.get();
	}

	public async getById(id: string): Promise<IBudget> {
		return await this._budgetService.getById(id);
	}

	public async create(user: IUser, name: string, category: string, total_amount: number): Promise<string> {
		return await this._budgetService.create(user, name, category, total_amount);
	}

	public async update(user: IUser, id: string, total_amount: number): Promise<void> {
		await this._budgetService.update(user, id, total_amount);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		await this._budgetService.remove(user, id);
	}
}
