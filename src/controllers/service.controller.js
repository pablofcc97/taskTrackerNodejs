import ServiceService from '../services/service.service.js';
import { catchAsync } from '../utils/controller.js';

export default class ServiceController {
    constructor(){
        this.serviceService = new ServiceService()
    }

    listServices = catchAsync( async (req, res) => {
        const services = await this.serviceService.listServices()

        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                services
            }
        })
    })

    createService = catchAsync( async (req, res) => {
        const {body} = req
        const service = await this.serviceService.createService(body)

        return res.status(201).json({
            status: 'success',
            data: {
                service
            }
        })
    })

    getService = catchAsync( async (req, res) => {
        const {id} = req.params
        const service = await this.serviceService.getService(id)

        return res.status(200).json({
            status: 'success',
            data: {
                service
            }
        })
    })

    updateService = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const service = await this.serviceService.updateService(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                service
            }
        })
    })

    deleteService = catchAsync( async (req, res) => {
        const {id} = req.params

        const service = await this.serviceService.deleteService(id)

        return res.status(204).end()
    })
}