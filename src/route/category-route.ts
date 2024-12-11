import express from 'express';
const router = express.Router();
import * as categroyHandler from '../handler/category-handler';
import { authorizer } from '../common/middleware/authoriser';

//Get all categories of a particular user
router.get('/user', authorizer, categroyHandler.getByUser);

//Get all categories
router.get('/', authorizer, categroyHandler.get);

//Get category by id
router.get('/:id', authorizer, categroyHandler.getById);

//Get category by name
router.get('/:name', authorizer, categroyHandler.getByName);

//Create category
router.post('/', authorizer, categroyHandler.create);

export default router;
