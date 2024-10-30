import express from 'express';
import PhotoController from '../controllers/photo.controller.js';
import PhotoService from '../services/photo.service.js';
import PhotoRepository from '../repositories/photo.repository.js';
import TaskAdvanceRepository from '../repositories/taskAdvance.repository.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPhotoValidation } from '../validations/photo.validation.js';

const photoRepository = new PhotoRepository()
const taskAdvanceRepository = new TaskAdvanceRepository
const photoService = new PhotoService(photoRepository, taskAdvanceRepository)
const photoController = new PhotoController(photoService)

const photoRouter = express.Router()
photoRouter.route('/photos')
          .get(authenticate, photoController.listPhotos)
          .post(authenticate, validate(createPhotoValidation), photoController.createPhoto)

photoRouter.route('/photos/:id')
          .get(authenticate, photoController.getPhoto)
          //.patch(authenticate, photoController.updatePhoto)
          .delete(authenticate, photoController.deletePhoto)

//photoRouter.route('/photos/:id/')

export default photoRouter