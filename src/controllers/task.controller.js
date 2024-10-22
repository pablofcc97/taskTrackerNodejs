import TaskService from '../services/task.service.js';
import { catchAsync } from '../utils/controller.js';

export default class TaskController {
    constructor(){
        this.taskService = new TaskService()
    }

    listTasks = catchAsync( async (req, res) => {
        const tasks = await this.taskService.listTasks()

        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                tasks
            }
        })
    })

    createTask = catchAsync( async (req, res) => {
        const {body} = req
        const task = await this.taskService.createTask(body)

        return res.status(201).json({
            status: 'success',
            data: {
                task
            }
        })
    })

    getTask = catchAsync( async (req, res) => {
        const {id} = req.params
        const task = await this.taskService.getTask(id)

        return res.status(200).json({
            status: 'success',
            data: {
                task
            }
        })
    })

    updateTask = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const task = await this.taskService.updateTask(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                task
            }
        })
    })

    deleteTask = catchAsync( async (req, res) => {
        const {id} = req.params

        const task = await this.taskService.deleteTask(id)

        return res.status(204).end()
    })
}