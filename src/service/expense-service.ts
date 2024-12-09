import { IExpense } from '../interface/expense';
import { IUser } from '../interface/user';
import Expense from '../model/expense';
import UserService from './user-service';

export default class ExpenseService {
	private _userService = new UserService();

	private async _save(expenseInput: IExpense, isNew: boolean = true): Promise<IExpense> {
		const expense = new Expense(expenseInput);
		expense.isNew = isNew;
		return (await expense.save()).toObject();
	}

	public async get(): Promise<IExpense[]> {
		return Expense.find().lean();
	}

	public async getById(id: string): Promise<IExpense> {
		const expense = await Expense.findById(id);
		if (!expense) {
			throw new Error('Expense not found');
		}
		return expense;
	}

	public async create(user: IUser, name: string, amount: number, category: string): Promise<string> {
		const expenseInput: IExpense = {
			name,
			amount,
			category: category as any,
			created_by: user._id as string,
			updated_by: user._id as string,
		};

		const expense = await this._save(expenseInput);
		await this._userService.addExpense(user, amount);
		return expense._id as string;
	}

	public async update(user: IUser, id: string, name: string, amount: number, category: string): Promise<void> {
		const expense = await this.getById(id);
		const expenseInput: IExpense = {
			_id: expense._id,
			name: name || expense.name,
			amount: amount || expense.amount,
			category: (category as any) || expense.category,
			created_by: expense.created_by,
			updated_by: user._id as string,
		};
		console.log('expenseInput', expenseInput);
		await this._save(expenseInput, false);
		await this._userService.addExpense(user, amount - expense.amount);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		const expense = await this.getById(id);
		await this._userService.addExpense(user, -expense.amount);
		await Expense.findByIdAndDelete(id);
	}
}
