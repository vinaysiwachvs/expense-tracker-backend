import { Request, Response, NextFunction } from 'express';
import UserService from '../../service/user-service';
import { verifyToken } from '../utils/token-utils';
import { jwtDecode } from 'jwt-decode';

const userService = new UserService();

export const authorizer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			res.status(401).json({ message: 'No Header. Please login again.' });
			return;
		}

		const [_, token] = authorization.split(' ');

		if (!token) {
			res.status(401).json({ message: 'No token. Please login again.' });
			return;
		}

		if (isJwtExpired(token)) {
			res.status(401).json({ message: 'Token expired. Please login again.' });
			return;
		}

		const payload: any = await verifyToken(token);
		console.log('payload', payload);

		if (!payload) {
			res.status(401).json({ message: 'Invalid token. Please login again.' });
			return;
		}

		const user = await userService.getById(payload._id);
		if (!user) {
			res.status(401).json({ message: 'No Token in cache or not matching. Please login' });
			return;
		}

		if (!req.body) req.body = {};
		req.body.loggedInUser = user;

		next(); // Pass control to the next middleware or handler
	} catch (error) {
		console.error('Error in authorizer:', error);
		next(error); // Pass the error to the Express error handler
	}
};

function isJwtExpired(token: string): boolean {
	const decoded: any = jwtDecode(token);
	const now = Math.floor(Date.now() / 1000);
	return decoded.exp! < now;
}
