import { Request, Response, NextFunction } from 'express';
import BudgetController from '../controller/budget-controller';

const budgetController = new BudgetController();

export const getByUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const budgets = await budgetController.getByUser(user);
		res.status(200).json(budgets);
	} catch (error) {
		next(error);
	}
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const budgets = await budgetController.get();
		res.status(200).json(budgets);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const budget = await budgetController.getById(id);
		res.status(200).json(budget);
	} catch (error) {
		next(error);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { name, category, total_amount } = req.body;
		const _id = await budgetController.create(user, name, category, total_amount);
		res.status(200).json({ _id, message: 'Budget created successfully' });
	} catch (error) {
		next(error);
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { id } = req.params;
		const { total_amount } = req.body;
		await budgetController.update(user, id, total_amount);
		res.status(200).json({ message: 'Budget updated successfully' });
	} catch (error) {
		next(error);
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { id } = req.params;
		await budgetController.remove(user, id);
		res.status(200).json({ message: 'Budget deleted successfully' });
	} catch (error) {
		next(error);
	}
};
