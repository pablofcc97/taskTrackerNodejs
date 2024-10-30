import express from 'express';
import PhotoController from '../controllers/photo.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPhotoValidation } from '../validations/photo.validation.js';
import CustomContainer from '../utils/customContainer.js';

const container = CustomContainer.getInstance()
const photoController = container.get(PhotoController.name)

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