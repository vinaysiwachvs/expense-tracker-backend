import express from 'express';
const router = express.Router();
import * as userHandler from '../handler/user-handler';
import { authorizer } from '../common/middleware/authoriser';

//Get all users
router.get('/', authorizer, userHandler.get);

//Get user by id
router.get('/:id', authorizer, userHandler.getById);

//Create user
router.post('/', userHandler.create);

//User login
router.post('/login', userHandler.login);

//User logout
router.post('/logout', authorizer, userHandler.logout);

export default router;
