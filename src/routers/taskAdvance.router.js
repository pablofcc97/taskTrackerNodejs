import express from 'express';
import TaskAdvanceController from '../controllers/taskAdvance.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateTaskAdvanceValidation } from '../validations/taskAdvance.validation.js';
import CustomContainer from '../utils/customContainer.js';



const container = CustomContainer.getInstance()
const taskAdvanceController = container.get(TaskAdvanceController.name)


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