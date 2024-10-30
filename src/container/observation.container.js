import CustomContainer from '../utils/customContainer.js';
import ObservationController from '../controllers/observation.controller.js';
import ObservationService from '../services/observation.service.js';
import ObservationRepository from '../repositories/observation.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';

const container = CustomContainer.getInstance();

// ticket.roter.js
container.addClass(ObservationRepository.name, ObservationRepository, []);
container.addClass(ObservationService.name, ObservationService, [ObservationRepository.name, TaskAdvanceRepository.name]);
container.addClass(ObservationController.name, ObservationController, [ObservationService.name]);