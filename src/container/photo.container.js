import CustomContainer from '../utils/customContainer.js';
import PhotoController from '../controllers/photo.controller.js';
import PhotoService from '../services/photo.service.js';
import PhotoRepository from '../repositories/photo.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(PhotoRepository.name, PhotoRepository, []);
container.addClass(PhotoService.name, PhotoService, [PhotoRepository.name, TaskAdvanceRepository.name]);
container.addClass(PhotoController.name, PhotoController, [PhotoService.name]);