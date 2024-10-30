import CustomContainer from '../utils/customContainer.js';
import TaskAdvanceController from '../controllers/taskAdvance.controller.js';
import TaskAdvanceService from '../services/taskAdvance.service.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';
import TaskRepository from '../repositories/task.repository.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(TaskAdvanceService.name, TaskAdvanceService, [TaskAdvanceRepository.name, TaskRepository.name]);
container.addClass(TaskAdvanceController.name, TaskAdvanceController, [TaskAdvanceService.name]);