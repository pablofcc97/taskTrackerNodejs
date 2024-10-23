import express from 'express';
import PhotoController from '../controllers/photo.controller.js';
import passport from 'passport';
import { authenticate } from '../middlewares/auth.middleware.js';

const photoController = new PhotoController()

const photoRouter = express.Router()
photoRouter.route('/photos')
          .get(authenticate, photoController.listPhotos)
          .post(authenticate, photoController.createPhoto)

photoRouter.route('/photos/:id')
          .get(authenticate, photoController.getPhoto)
          .patch(authenticate, photoController.updatePhoto)
          .delete(authenticate, photoController.deletePhoto)

//photoRouter.route('/photos/:id/')

export default photoRouter