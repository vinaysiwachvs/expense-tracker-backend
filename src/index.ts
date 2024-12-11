import { Request, Response } from 'express';
import createServer from './app';
import CommonVariables from './common/common-variables';
//common routes
import userRoute from './route/user-route';
import expenseRoute from './route/expense-route';
import budgetRoute from './route/budget-route';
import categoryRoute from './route/category-route';

import { defaultErrorHandler } from './common/middleware/error-middleware';

const app = createServer();
const { PORT, NODE_ENV, APP_SERVICE_NAME } = CommonVariables;

app.get('/', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const response = {
		message: 'Welcome to the Expense Tracker Backend',
		environment: NODE_ENV,
		service: APP_SERVICE_NAME,
	};
	res.json(response);
});

app.use('/api/users', userRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/budgets', budgetRoute);
app.use('/api/categories', categoryRoute);

// Error Handler Middleware
app.use(defaultErrorHandler);

app.listen(PORT, () => {
	console.log(`Application is listening on port: ${PORT}, environment: ${NODE_ENV}, service: ${APP_SERVICE_NAME}`);
});
