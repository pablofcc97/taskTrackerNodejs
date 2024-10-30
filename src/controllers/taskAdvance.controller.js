import TaskAdvanceService from '../services/taskAdvance.service.js';
import { catchAsync } from '../utils/controller.js';

export default class TaskAdvanceController {
    constructor( taskAdvanceService){
        this.taskAdvanceService = taskAdvanceService
    }

    listTaskAdvances = catchAsync( async (req, res) => {
        const taskAdvances = await this.taskAdvanceService.listTaskAdvances()

        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                taskAdvances
            }
        })
    })

    createTaskAdvance = catchAsync( async (req, res) => {
        const {body} = req
        const taskAdvance = await this.taskAdvanceService.createTaskAdvance(body)

        return res.status(201).json({
            status: 'success',
            data: {
                taskAdvance
            }
        })
    })

    getTaskAdvance = catchAsync( async (req, res) => {
        const {id} = req.params
        const taskAdvance = await this.taskAdvanceService.getTaskAdvance(id)

        return res.status(200).json({
            status: 'success',
            data: {
                taskAdvance
            }
        })
    })

    updateTaskAdvance = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const taskAdvance = await this.taskAdvanceService.updateTaskAdvance(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                taskAdvance
            }
        })
    })

    deleteTaskAdvance = catchAsync( async (req, res) => {
        const {id} = req.params

        const taskAdvance = await this.taskAdvanceService.deleteTaskAdvance(id)

        return res.status(204).end()
    })
}