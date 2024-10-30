import CustomContainer from '../utils/customContainer.js';
import TaskController from '../controllers/task.controller.js';
import TaskService from '../services/task.service.js';
import TaskRepository from '../repositories/task.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';
import ServiceRepository from '../repositories/service.repository.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(TaskRepository.name, TaskRepository, []);
container.addClass(TaskAdvanceRepository.name, TaskAdvanceRepository, []);
container.addClass(TaskService.name, TaskService, [TaskRepository.name, ServiceRepository.name, TaskAdvanceRepository.name]);
container.addClass(TaskController.name, TaskController, [TaskService.name]);