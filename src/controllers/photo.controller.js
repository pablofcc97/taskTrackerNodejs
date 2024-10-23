import PhotoService from '../services/photo.service.js';
import { catchAsync } from '../utils/controller.js';

export default class PhotoController {
    constructor(){
        this.photoService = new PhotoService()
    }

    listPhotos = catchAsync( async (req, res) => {
        const photos = await this.photoService.listPhotos()

        return res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                photos
            }
        })
    })

    createPhoto = catchAsync( async (req, res) => {
        const {body} = req
        const photo = await this.photoService.createPhoto(body)

        return res.status(201).json({
            status: 'success',
            data: {
                photo
            }
        })
    })

    getPhoto = catchAsync( async (req, res) => {
        const {id} = req.params
        const photo = await this.photoService.getPhoto(id)

        return res.status(200).json({
            status: 'success',
            data: {
                photo
            }
        })
    })

    updatePhoto = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const photo = await this.photoService.updatePhoto(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                photo
            }
        })
    })

    deletePhoto = catchAsync( async (req, res) => {
        const {id} = req.params

        const photo = await this.photoService.deletePhoto(id)

        return res.status(204).end()
    })
}