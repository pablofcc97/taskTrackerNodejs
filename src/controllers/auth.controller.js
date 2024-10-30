import AuthService from '../services/auth.service.js';
import { matchedData } from 'express-validator';
import { catchAsync } from '../utils/controller.js';

class AuthController {
  constructor(authService) {
    this.authService = authService
  }

  signup = catchAsync(async (req, res) => {

    const matchedBody = matchedData(req)
    await this.authService.signup(matchedBody)

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado',
      data: null,
    });
  });

  login = catchAsync(async (req, res) => {
    const matchedBody = matchedData(req)
    const tokens = await this.authService.login(matchedBody);

    res.status(200).json({
      status: 'success',
      data: {
        tokens,
      },
    });
  });

  loginGoogle = catchAsync(async (req, res) => {
    const { code } = req.body;

    const tokens = await this.authService.loginGoogle(code);

    res.status(200).json({
      status: 'success',
      data: {
        tokens,
      },
    });
  });
}

export default AuthController;
