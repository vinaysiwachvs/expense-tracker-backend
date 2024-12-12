import { getByBudget } from './../handler/expense-handler';
import { IExpense } from '../interface/expense';
import { IUser } from '../interface/user';
import ExpenseService from '../service/expense-service';

export default class ExpenseController {
	private _expenseService = new ExpenseService();

	public async get(): Promise<IExpense[]> {
		return await this._expenseService.get();
	}

	public async getById(id: string): Promise<IExpense> {
		return await this._expenseService.getById(id);
	}

	public async getByUser(user: IUser): Promise<IExpense[]> {
		return await this._expenseService.getByUser(user);
	}

	public async getByBudget(user: IUser, budgetId: string): Promise<IExpense[]> {
		return await this._expenseService.getByBudget(user, budgetId);
	}

	public async create(user: IUser, name: string, amount: number, budget: string): Promise<string> {
		return await this._expenseService.create(user, name, amount, budget);
	}

	public async update(user: IUser, id: string, name: string, amount: number): Promise<void> {
		await this._expenseService.update(user, id, name, amount);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		await this._expenseService.remove(user, id);
	}
}
