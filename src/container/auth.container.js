import CustomContainer from '../utils/customContainer.js';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import UserRepository from '../repositories/user.repository.js';
import { OAuth2Client } from 'google-auth-library';
import TokenService from '../services/token.service.js';
import BcryptAdapter from '../adapters/bcrypt.adapter.js';
import config from '../utils/config.js';

const container = CustomContainer.getInstance();

container.addClass(OAuth2Client.name, OAuth2Client, [config.google.clientId, config.google.clientSecret, 'postmessage']);
container.addClass(TokenService.name, TokenService, []);
container.addClass(BcryptAdapter.name, BcryptAdapter, []);
container.addClass(AuthService.name, AuthService, [UserRepository.name, OAuth2Client.name, TokenService.name, BcryptAdapter.name]);
container.addClass(AuthController.name, AuthController, [AuthService.name]);