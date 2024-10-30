import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import UserRepository from '../repositories/user.repository.js';
import TokenService from '../services/token.service.js';
import BcryptAdapter from '../adapters/bcrypt.adapter.js';
import config from '../utils/config.js'
import { validate } from '../middlewares/validate.middleware.js';
import { signUpValidation, loginValidation } from '../validations/auth.validation.js';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(config.google.clientId, config.google.clientSecret, 'postmessage')
const userRepository = new UserRepository()
const tokenService = new TokenService()
const bcryptAdapter = new BcryptAdapter()

const authService = new AuthService(userRepository, oAuth2Client, tokenService, bcryptAdapter)
const authController = new AuthController(authService);

const authRouter = express.Router();



authRouter.post('/auth/signup', validate(signUpValidation), authController.signup);
authRouter.post('/auth/login', validate(loginValidation), authController.login);
authRouter.post('/auth/google', authController.loginGoogle);

export default authRouter;
