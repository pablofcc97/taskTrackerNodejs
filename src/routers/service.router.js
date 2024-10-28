import express from 'express';
import ServiceController from '../controllers/service.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createServiceValidation, updateServiceValidation } from '../validations/service.validation.js';

const serviceController = new ServiceController()

const serviceRouter = express.Router()
serviceRouter.route('/services')
            .get(authenticate, serviceController.listServices)
            .post(authenticate, validate(createServiceValidation), serviceController.createService)

serviceRouter.route('/services/:id')
            .get(authenticate, serviceController.getService)
            .patch(authenticate, validate(updateServiceValidation), serviceController.updateService)
            .delete(authenticate, serviceController.deleteService)

//taskRouter.route('/tasks/:id/')

export default serviceRouter