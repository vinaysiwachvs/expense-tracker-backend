import { Request, Response, NextFunction } from 'express';
import UserController from '../controller/user-controller';

const userController = new UserController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userController.get();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await userController.getById(id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body;
		const result = await userController.create(name, email, password);
		res.status(200).json({ _id: result._id, token: result.token, message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const token = await userController.login(email, password);
		res.status(200).json({ token, message: 'User logged in successfully' });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		await userController.logout(user);
		res.status(200).json({ message: 'User logged out successfully' });
	} catch (error) {
		next(error);
	}
};
