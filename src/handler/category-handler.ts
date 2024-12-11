import { Request, Response, NextFunction } from 'express';
import CategoryController from '../controller/category-controller';

const categoryController = new CategoryController();

export const getByUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const categories = await categoryController.getByUser(user);
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await categoryController.get();
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const category = await categoryController.getById(id);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

export const getByName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { name } = req.params;
		console.log(name);
		const category = await categoryController.getByName(user, name);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		const { name } = req.body;
		const _id = await categoryController.create(user, name);
		res.status(200).json({ _id, message: 'Category created successfully' });
	} catch (error) {
		next(error);
	}
};
