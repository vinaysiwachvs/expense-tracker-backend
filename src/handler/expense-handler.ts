import { Request, Response, NextFunction } from 'express';
import ExpenseController from '../controller/expense-controller';

const expenseController = new ExpenseController();

export const getByUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const expenses = await expenseController.getByUser(user);
		res.status(200).json(expenses);
	} catch (error) {
		next(error);
	}
};

export const getByBudget = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { id } = req.params;
		const expenses = await expenseController.getByBudget(user, id);
		res.status(200).json(expenses);
	} catch (error) {
		next(error);
	}
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const expenses = await expenseController.get();
		res.status(200).json(expenses);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const expense = await expenseController.getById(id);
		res.status(200).json(expense);
	} catch (error) {
		next(error);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { name, amount, budget } = req.body;
		const _id = await expenseController.create(user, name, amount, budget);
		res.status(200).json({ _id, message: 'Expense created successfully' });
	} catch (error) {
		next(error);
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { id } = req.params;
		const { name, amount } = req.body;
		await expenseController.update(user, id, name, amount);
		res.status(200).json({ message: 'Expense updated successfully' });
	} catch (error) {
		next(error);
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { id } = req.params;
		await expenseController.remove(user, id);
		res.status(200).json({ message: 'Expense deleted successfully' });
	} catch (error) {
		next(error);
	}
};
