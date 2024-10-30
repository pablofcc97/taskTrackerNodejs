import express from 'express';
import TaskAdvanceController from '../controllers/taskAdvance.controller.js';
import TaskAdvanceService from '../services/taskAdvance.service.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';
import TaskRepository from '../repositories/task.repository.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateTaskAdvanceValidation } from '../validations/taskAdvance.validation.js';

const taskAdvanceRepository = new TaskAdvanceRepository()
const taskRepository = new TaskRepository()
const taskAdvanceService = new TaskAdvanceService(taskAdvanceRepository, taskRepository)
const taskAdvanceController = new TaskAdvanceController(taskAdvanceService)

const taskAdvanceRouter = express.Router()
taskAdvanceRouter.route('/taskAdvances')
                .get(authenticate, taskAdvanceController.listTaskAdvances)
                //.post(authenticate, taskAdvanceController.createTaskAdvance)

taskAdvanceRouter.route('/taskAdvances/:id')
                .get(authenticate, taskAdvanceController.getTaskAdvance)
                .patch(authenticate, validate(updateTaskAdvanceValidation), taskAdvanceController.updateTaskAdvance)
                //.delete(authenticate, taskAdvanceController.deleteTaskAdvance)

//taskAdvanceRouter.route('/taskAdvances/:id/')

export default taskAdvanceRouter