import express from 'express';
import TaskController from '../controllers/task.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.js';
import CustomContainer from '../utils/customContainer.js';


const container = CustomContainer.getInstance()
const taskController = container.get(TaskController.name)

const taskRouter = express.Router()
taskRouter.route('/tasks')
          .get(authenticate, taskController.listTasks)
          .post(authenticate, validate(createTaskValidation), taskController.createTask)

taskRouter.route('/tasks/:id')
          .get(authenticate, taskController.getTask)
          .patch(authenticate, validate(updateTaskValidation), taskController.updateTask)
          .delete(authenticate, taskController.deleteTask)

//taskRouter.route('/tasks/:id/')

export default taskRouter