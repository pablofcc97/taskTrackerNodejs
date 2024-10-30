import { body } from "express-validator"

export const createObservationValidation = [
    body('content').notEmpty().withMessage('Contenido requerido').isString().withMessage('El contenido de la observación debe ser tipo  cadena'),
    body('task_advance_id').notEmpty().withMessage('La observación se debe asociar a un avance')
                           .isInt().withMessage('El id del avance debe ser entero')
]

export const updateObservationValidation = [
    body('content').notEmpty().withMessage('Contenido requerido').isString().withMessage('El contenido de la observación debe ser tipo  cadena'),
    body('task_advance_id').optional().isInt().withMessage('El id del avance debe ser entero')
]