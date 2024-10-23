import express from 'express';
import TaskController from '../controllers/task.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const taskController = new TaskController()

const taskRouter = express.Router()
taskRouter.route('/tasks')
          .get(authenticate, taskController.listTasks)
          .post(authenticate, taskController.createTask)

taskRouter.route('/tasks/:id')
          .get(authenticate, taskController.getTask)
          .patch(authenticate, taskController.updateTask)
          .delete(authenticate, taskController.deleteTask)

//taskRouter.route('/tasks/:id/')

export default taskRouter