import express from 'express';
import TaskAdvanceController from '../controllers/taskAdvance.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const taskAdvanceController = new TaskAdvanceController()

const taskAdvanceRouter = express.Router()
taskAdvanceRouter.route('/taskAdvances')
                .get(authenticate, taskAdvanceController.listTaskAdvances)
                .post(authenticate, taskAdvanceController.createTaskAdvance)

taskAdvanceRouter.route('/taskAdvances/:id')
                .get(authenticate, taskAdvanceController.getTaskAdvance)
                .patch(authenticate, taskAdvanceController.updateTaskAdvance)
                .delete(authenticate, taskAdvanceController.deleteTaskAdvance)

//taskAdvanceRouter.route('/taskAdvances/:id/')

export default taskAdvanceRouter