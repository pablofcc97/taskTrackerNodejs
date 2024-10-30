import express from 'express';
import ObservationController from '../controllers/observation.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createObservationValidation, updateObservationValidation } from '../validations/observation.validation.js';
import CustomContainer from '../utils/customContainer.js';


const container = CustomContainer.getInstance()
const observationController = container.get(ObservationController.name)

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