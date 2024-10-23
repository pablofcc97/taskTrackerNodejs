import express from 'express';
import ObservationController from '../controllers/observation.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const observationController = new ObservationController()

const observationRouter = express.Router()
observationRouter.route('/observations')
          .get(authenticate, observationController.listObservations)
          .post(authenticate, observationController.createObservation)

observationRouter.route('/observations/:id')
          .get(authenticate, observationController.getObservation)
          .patch(authenticate, observationController.updateObservation)
          .delete(authenticate, observationController.deleteObservation)

//observationRouter.route('/observations/:id/')

export default observationRouter