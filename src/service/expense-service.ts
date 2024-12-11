import { IUser } from './../interface/user';
import { IExpense } from '../interface/expense';
import Expense from '../model/expense';
import BudgetService from './budget-service';
import CategoryService from './category-service';
import UserService from './user-service';

export default class ExpenseService {
	private _userService = new UserService();
	private _budgetService = new BudgetService();
	private _categoryService = new CategoryService();

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

	public async getByUser(user: IUser): Promise<IExpense[]> {
		return Expense.find({ _id: { $in: user.expense } }).lean();
	}

	public async create(user: IUser, name: string, amount: number, category: string): Promise<string> {
		const fullCategory = await this._categoryService.getByName(user, category);
		const expenseInput: IExpense = {
			name,
			amount,
			category: fullCategory._id as string,
			created_by: user._id as string,
			updated_by: user._id as string,
		};

		const expense = await this._save(expenseInput);
		await this._userService.addExpense(user._id as string, expense);
		await this._budgetService.updateUsedAmount(user, expense.category as string, expense.amount);
		return expense._id as string;
	}

	public async update(user: IUser, expenseId: string, name: string, amount: number, category: string): Promise<void> {
		const expense = await this.getById(expenseId);
		const fullCategory = await this._categoryService.getByName(user, category);
		await this._userService.removeExpense(user._id as string, expenseId, expense.amount);
		await this._budgetService.updateUsedAmount(user, expense.category as string, -expense.amount);
		const updatedExpense: IExpense = {
			_id: expense._id,
			name: name || expense.name,
			amount: amount || expense.amount,
			category: fullCategory._id || expense.category,
			created_by: expense.created_by,
			updated_by: user._id as string,
		};
		await this._budgetService.updateUsedAmount(user, fullCategory._id as string, updatedExpense.amount);
		await this._userService.addExpense(user._id as string, updatedExpense);
		await this._save(updatedExpense, false);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		const expense = await this.getById(id);
		await this._userService.removeExpense(user._id as string, id, expense.amount);
		await this._budgetService.updateUsedAmount(user, expense.category as string, -expense.amount);
		await Expense.findByIdAndDelete(id);
	}
}
