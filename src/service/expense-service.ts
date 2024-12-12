import { IUser } from './../interface/user';
import { IExpense } from '../interface/expense';
import Expense from '../model/expense';
import BudgetService from './budget-service';
import UserService from './user-service';

export default class ExpenseService {
	private _userService = new UserService();
	private _budgetService = new BudgetService();

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

	public async getByBudget(user: IUser, budgetId: string): Promise<IExpense[]> {
		return Expense.find({ _id: { $in: user.expense }, budget: budgetId }).lean();
	}

	public async create(user: IUser, name: string, amount: number, budget: string): Promise<string> {
		const fullBudget = await this._budgetService.getById(budget);
		const expenseInput: IExpense = {
			name,
			amount,
			budget: fullBudget._id as string,
			created_by: user._id as string,
			updated_by: user._id as string,
		};

		const expense = await this._save(expenseInput);
		await this._userService.addExpense(user._id as string, expense);
		await this._budgetService.updateUsedAmount(user, fullBudget, expense.amount);
		return expense._id as string;
	}

	public async update(user: IUser, expenseId: string, name: string, amount: number): Promise<void> {
		const expense = await this.getById(expenseId);
		const fullBudget = await this._budgetService.getById(expense.budget as string);
		await this._userService.removeExpense(user._id as string, expenseId, expense.amount);
		await this._budgetService.updateUsedAmount(user, fullBudget, -expense.amount);
		const updatedExpense: IExpense = {
			_id: expense._id,
			name: name || expense.name,
			amount: amount || expense.amount,
			budget: (fullBudget._id as string) || expense.budget,
			created_by: expense.created_by,
			updated_by: user._id as string,
		};
		await this._budgetService.updateUsedAmount(user, fullBudget, updatedExpense.amount);
		await this._userService.addExpense(user._id as string, updatedExpense);
		await this._save(updatedExpense, false);
	}

	public async remove(user: IUser, id: string): Promise<void> {
		const expense = await this.getById(id);
		await this._userService.removeExpense(user._id as string, id, expense.amount);
		const budget = await this._budgetService.getById(expense.budget as string);
		await this._budgetService.updateUsedAmount(user, budget, -expense.amount);
		await Expense.findByIdAndDelete(id);
	}
}
