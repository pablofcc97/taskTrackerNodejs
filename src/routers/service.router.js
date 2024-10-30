import express from 'express';
import ServiceController from '../controllers/service.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createServiceValidation, updateServiceValidation } from '../validations/service.validation.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance()
const serviceController = container.get(ServiceController.name)

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