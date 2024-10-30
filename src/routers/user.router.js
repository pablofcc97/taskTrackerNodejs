import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import UserController from '../controllers/user.controller.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance()
const userController = container.get(UserController.name)
const userRouter = express.Router();

userRouter.route('/users')
          .get(authenticate, userController.listUsers)

userRouter.route('/users/:id')
          .get(authenticate, userController.getUser)
          .patch(authenticate, userController.updateUser)
          .delete(authenticate, userController.deleteUser)

export default userRouter;
