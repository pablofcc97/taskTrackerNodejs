import { body } from "express-validator"

const validateConfirmPassword = (value, {req}) => {
    return value === req.body.password
}

export const signUpValidation = [
    body('email').notEmpty().withMessage('Correo requerido')
                 .isEmail().withMessage('Correo invalido'),
    body('password').notEmpty().withMessage('Contraseña requerida')
                    .isLength({min: 6}).withMessage('La contraseña debe tener minimo 6 caracteres'),
    body('confirmPassword').notEmpty().withMessage('Confirmación de contraseña requerida')
                           .custom(validateConfirmPassword).withMessage('Las contraseñas deben coincidir'),
    body('name').notEmpty().withMessage('Nombres requerido'),
    body('lastname').notEmpty().withMessage('Apellidos requeridos'),
]

export const loginValidation = [
    body('email').notEmpty().withMessage('Correo requerido').isEmail().withMessage('Correo invalido'),
    body('password').notEmpty().withMessage('Contraseña requerida'),
]