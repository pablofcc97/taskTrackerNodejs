import PhotoRepository from "../repositories/photo.repository.js";
import ApiError from "../utils/errorApi.js";

class PhotoService{
    constructor(){
        this.photoRepository = new PhotoRepository()
    }

    validateAndGetPhoto = async (id) => {
        let photo

        //td: obtener con el avance ,etc
        photo = await this.photoRepository.getById(id);

        if (!photo) throw new ApiError(404, 'Fotografia no encontrada')

        return photo
    }

    listPhotos = async () => {
        return this.photoRepository.getAll()
    }

    getPhoto = async (id) => {
        return await this.validateAndGetPhoto(id)
    }

    createPhoto = async (photo) => {
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