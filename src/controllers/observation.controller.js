import ObservationService from '../services/observation.service.js';
import { catchAsync } from '../utils/controller.js';

export default class ObservationController {
    constructor(){
        this.observationService = new ObservationService()
    }

    listObservations = catchAsync( async (req, res) => {
        const observations = await this.observationService.listObservations()

        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                observations
            }
        })
    })

    createObservation = catchAsync( async (req, res) => {
        const {body} = req
        const observation = await this.observationService.createObservation(body)

        return res.status(201).json({
            status: 'success',
            data: {
                observation
            }
        })
    })

    getObservation = catchAsync( async (req, res) => {
        const {id} = req.params
        const observation = await this.observationService.getObservation(id)

        return res.status(200).json({
            status: 'success',
            data: {
                observation
            }
        })
    })

    updateObservation = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const observation = await this.observationService.updateObservation(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                observation
            }
        })
    })

    deleteObservation = catchAsync( async (req, res) => {
        const {id} = req.params

        const observation = await this.observationService.deleteObservation(id)

        return res.status(204).end()
    })
}