import express from 'express';
const router = express.Router();
import * as budgetHandler from '../handler/budget-handler';
import { authorizer } from '../common/middleware/authoriser';

//Get all budgets of a particular user
router.get('/user', authorizer, budgetHandler.getByUser);

//Get all budgets
router.get('/', authorizer, budgetHandler.get);

//Get budget by id
router.get('/:id', authorizer, budgetHandler.getById);

//Create budget
router.post('/', authorizer, budgetHandler.create);

//Edit budget amount by id
router.patch('/:id', authorizer, budgetHandler.update);

//Delete budget by id
router.delete('/:id', authorizer, budgetHandler.remove);

export default router;
