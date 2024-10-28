import { body } from "express-validator"

const validateDateHourInit = (value, {req}) => {
    return value < req.body.date_hour_end
}

const validateDateHourEnd = (value, {req}) => {
    return value > req.body.date_hour_init
}

export const createServiceValidation = [
    body('name').notEmpty().withMessage('Nombre requerido'),
    body('estado').optional().isIn(['planificado', 'iniciado', 'retrasado', 'completado']).withMessage('Estado inválido. Debe ser uno de los siguientes: planificado, iniciado, retrasado, completado'),
    body('percent_advance').optional().isInt({ min: 0, max: 100 }).withMessage('Porcentaje debe ser un número entre 0 y 100'),
    body('date_hour_init').notEmpty().withMessage('Fecha de inicio requerida')
                           .custom(validateDateHourInit).withMessage('La fecha de inicio debe ser menor a la fecha final'),
    body('date_hour_end').notEmpty().withMessage('Fecha de fin requerida')
]

export const updateServiceValidation = [
    body('estado').optional().isIn(['planificado', 'iniciado', 'retrasado', 'completado']).withMessage('Estado inválido. Debe ser uno de los siguientes: planificado, iniciado, retrasado, completado'),
    body('percent_advance').optional().isInt({ min: 0, max: 100 }).withMessage('Porcentaje debe ser un número entre 0 y 100'),
    body('date_hour_init').optional()
                          .custom(validateDateHourInit).withMessage('La fecha de inicio debe ser menor a la fecha final'),
    body('date_hour_end').optional()
                         .custom(validateDateHourEnd)   
]
