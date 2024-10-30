import express from 'express';
import ObservationController from '../controllers/observation.controller.js';
import ObservationService from '../services/observation.service.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createObservationValidation, updateObservationValidation } from '../validations/observation.validation.js';
import ObservationRepository from '../repositories/observation.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';

const observationRepository = new ObservationRepository()
const taskAdvanceRepository = new TaskAdvanceRepository()
const observationService = new ObservationService(observationRepository, taskAdvanceRepository)

const observationController = new ObservationController(observationService)

const observationRouter = express.Router()
observationRouter.route('/observations')
          .get(authenticate, observationController.listObservations)
          .post(authenticate, validate(createObservationValidation), observationController.createObservation)

observationRouter.route('/observations/:id')
          .get(authenticate, observationController.getObservation)
          .patch(authenticate, validate(updateObservationValidation), observationController.updateObservation)
          .delete(authenticate, observationController.deleteObservation)

//observationRouter.route('/observations/:id/')

export default observationRouter