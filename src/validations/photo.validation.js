import { body } from "express-validator"

const validateMissingField = (value, { req }) => {
    return value == undefined
}

export const createPhotoValidation = [
    body('task_advance_id').notEmpty().withMessage('La observación se debe asociar a un avance')
                           .isInt().withMessage('El id del avance debe ser entero'),
    body('path').optional().custom(validateMissingField).withMessage('La ruta no es requerida')
]
