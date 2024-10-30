import PhotoRepository from "../repositories/photo.repository.js";
import TaskAdvanceRepository from "../repositories/taskAdvance.repository.js";
import ApiError from "../utils/errorApi.js";
import { v4 as uuidv4 } from 'uuid';

class PhotoService{
    constructor(photoRepository, taskAdvanceRepository){
        this.photoRepository = photoRepository
        this.taskAdvanceRepository = taskAdvanceRepository
    }

    validateAndGetPhoto = async (id) => {
        let photo

        //td: obtener con el avance ,etc
        photo = await this.photoRepository.getById(id);

        if (!photo) throw new ApiError(404, 'Fotografia no encontrada')

        return photo
    }

    validateTaskAdvance = async (id) => {
        let taskAdvance

        //td: obtener con el avance ,etc
        taskAdvance = await this.taskAdvanceRepository.getById(id);

        if (!taskAdvance) throw new ApiError(404, 'Avance no disponible. Verificar')
    }



    listPhotos = async () => {
        return this.photoRepository.getAll()
    }

    getPhoto = async (id) => {
        return await this.validateAndGetPhoto(id)
    }

    createPhoto = async (photo) => {
        await this.validateTaskAdvance(photo.task_advance_id)
        
         // Genera un UUID único y construye el path
        const uniquePath = `uploads/photos/${uuidv4()}.jpg`; // Ajusta la extensión según el tipo de imagen
        photo.path = uniquePath;

        return this.photoRepository.create(photo)
    }

    updatePhoto = async (id, newPhoto) => {
        await this.validateAndGetPhoto(id)
        return this.photoRepository.update(id, newPhoto)
    }

    deletePhoto = async (id) => {
        await this.validateAndGetPhoto(id)
        return this.photoRepository.delete(id)
    }
}

export default PhotoService