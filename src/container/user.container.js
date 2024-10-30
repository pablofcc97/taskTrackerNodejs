import CustomContainer from '../utils/customContainer.js';
import UserController from '../controllers/user.controller.js';
import UserService from '../services/user.service.js';
import UserRepository from '../repositories/user.repository.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(UserService.name, UserService, [UserRepository.name]);
container.addClass(UserController.name, UserController, [UserService.name]);