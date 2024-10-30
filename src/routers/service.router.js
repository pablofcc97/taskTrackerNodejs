import express from 'express';
import ServiceService from '../services/service.service.js';
import ServiceController from '../controllers/service.controller.js';
import ServiceRepository from '../repositories/service.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createServiceValidation, updateServiceValidation } from '../validations/service.validation.js';

const serviceRepository = new ServiceRepository()
const userRepository = new UserRepository()
const serviceService = new ServiceService(serviceRepository, userRepository)
const serviceController = new ServiceController(serviceService)

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