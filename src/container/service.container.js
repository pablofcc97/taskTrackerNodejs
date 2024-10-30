import ServiceController from '../controllers/service.controller.js';
import ServiceService from '../services/service.service.js';
import UserRepository from '../repositories/user.repository.js';
import ServiceRepository from '../repositories/service.repository.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(ServiceRepository.name, ServiceRepository, []);
container.addClass(UserRepository.name, UserRepository, []);
container.addClass(ServiceService.name, ServiceService, [ServiceRepository.name, UserRepository.name]);
container.addClass(ServiceController.name, ServiceController, [ServiceService.name]);