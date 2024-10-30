import express from 'express';
import TaskController from '../controllers/task.controller.js';
import TaskService from '../services/task.service.js';
import TaskRepository from '../repositories/task.repository.js';
import ServiceRepository from '../repositories/service.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createTaskValidation, updateTaskValidation } from '../validations/task.validation.js';

const taskRepository = new TaskRepository()
const serviceRepository = new ServiceRepository()
const taskAdvanceRepository = new TaskAdvanceRepository()
const taskService = new TaskService(taskRepository, serviceRepository, taskAdvanceRepository)
const taskController = new TaskController(taskService)

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