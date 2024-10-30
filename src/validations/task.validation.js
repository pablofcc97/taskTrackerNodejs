import { body } from "express-validator"

const validateMissingField = (value, { req }) => {
    return value == undefined
}

export const createTaskValidation = [
    body('name').notEmpty().withMessage('Nombre requerido')
                .isString().withMessage('Nombre es tipo cadena'),
    body('date_hour_init').notEmpty().withMessage('Fecha de inicio requerida')
                           .isISO8601().withMessage('Fecha de inicio debe estar en formato ISO (AAAA-MM-DDTHH:mm:ss)'),
    body('date_hour_end').notEmpty().withMessage('Fecha de fin requerida')
                         .isISO8601().withMessage('Fecha de fin debe estar en formato ISO (AAAA-MM-DDTHH:mm:ss)'),
    body('minutes_worked').optional()
                          .custom(validateMissingField).withMessage('Los minutos se calculan automaticamente'),
    body('state').optional()
                 .isIn(['planificado', 'iniciado', 'retrasado', 'completado']).withMessage('Estado inválido. Debe ser uno de los siguientes: planificado, iniciado, retrasado, completado')
                 .isString().withMessage('Estado es tipo cadena'),
    body('service_id').notEmpty().withMessage('Servicio asociado requerido')
                      .isInt().withMessage('Servicio asociado es tipo entero'),  
]

export const updateTaskValidation = [
    body('name').optional().isString().withMessage('Nombre es tipo cadena'),
    body('date_hour_init').optional()
                           .isISO8601().withMessage('Fecha de inicio debe estar en formato ISO (AAAA-MM-DDTHH:mm:ss)'),
    body('date_hour_end').optional()
                         .isISO8601().withMessage('Fecha de fin debe estar en formato ISO (AAAA-MM-DDTHH:mm:ss)'),
    body('minutes_worked').optional()
                          .custom(validateMissingField).withMessage('Los minutos se calculan automaticamente'),    
    body('personal_quantity').optional()
                             .isInt({ min: 0 }).withMessage('catidad de trabajadores debe ser un número mayor a 0 '),
    body('state').optional()
                 .isIn(['planificado', 'iniciado', 'retrasado', 'completado']).withMessage('Estado inválido. Debe ser uno de los siguientes: planificado, iniciado, retrasado, completado')
                 .isString().withMessage('Estado es tipo cadena'),
    body('service_id').optional()
                      .isInt().withMessage('Servicio asociado es tipo entero'), 
]
