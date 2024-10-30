import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import UserController from '../controllers/user.controller.js';
import UserService from '../services/user.service.js';
import UserRepository from '../repositories/user.repository.js';

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const userRouter = express.Router();

userRouter.route('/users')
          .get(authenticate, userController.listUsers)

userRouter.route('/users/:id')
          .get(authenticate, userController.getUser)
          .patch(authenticate, userController.updateUser)
          .delete(authenticate, userController.deleteUser)

export default userRouter;
