import express from 'express';
const router = express.Router();
import * as expenseHandler from '../handler/expense-handler';
import { authorizer } from '../common/middleware/authoriser';

//Get all expenses of a particular user
router.get('/user', authorizer, expenseHandler.getByUser);

//Get all expenses
router.get('/', authorizer, expenseHandler.get);

//Get expense by id
router.get('/:id', authorizer, expenseHandler.getById);

//Create expense
router.post('/', authorizer, expenseHandler.create);

//Edit expense
router.patch('/:id', authorizer, expenseHandler.update);

//Delete expense
router.delete('/:id', authorizer, expenseHandler.remove);

export default router;
