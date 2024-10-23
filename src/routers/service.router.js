import express from 'express';
import ServiceController from '../controllers/service.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const serviceController = new ServiceController()

const serviceRouter = express.Router()
serviceRouter.route('/services')
            .get(authenticate, serviceController.listServices)
            .post(authenticate, serviceController.createService)

serviceRouter.route('/services/:id')
            .get(authenticate, serviceController.getService)
            .patch(authenticate, serviceController.updateService)
            .delete(authenticate, serviceController.deleteService)

//taskRouter.route('/tasks/:id/')

export default serviceRouter