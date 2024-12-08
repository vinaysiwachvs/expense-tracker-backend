import { NextFunction, Request, Response } from 'express';
import ValidationErrors from '../validation/validator';
import zodValidationError from '../validation/zod-validator';

export const defaultErrorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
	// TODO: Log the error using the common handler
	if (error instanceof ValidationErrors) {
		res.status(400).json(error);
		return;
	}

	if (error instanceof zodValidationError) {
		console.log('zodValidationError');
		res.status(400).json({ message: error.message, errors: error.errors });
		return;
	}

	// next(error);
	console.log('Error in defaultErrorHandler', error);
	res.status(500).json({ message: error.message });
};
