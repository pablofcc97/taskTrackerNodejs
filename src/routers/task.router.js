import express from 'express';
import TaskController from '../controllers/task.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const taskController = new TaskController()

const taskRouter = express.Router()
taskRouter.route('/tasks')
          .get(authenticate, taskController.listTasks)
          .post(taskController.createTask)

taskRouter.route('/tasks/:id')
          .get(taskController.getTask)
          .patch(taskController.updateTask)
          .delete(taskController.deleteTask)

//taskRouter.route('/tasks/:id/')

export default taskRouter