import ServiceRepository from "../repositories/service.repository.js";
import ApiError from "../utils/errorApi.js";

class ServiceService{
    constructor(){
        this.serviceRepository = new ServiceRepository()
    }

    validateAndGetService = async (id, responsable = false) => {
        let service

        //td: obtener con el avance ,etc
        responsable 
            ? service = await this.serviceRepository.getByIdWithResponsable(id)
            : service = await this.serviceRepository.getById(id)

        if (!service) throw new ApiError(404, 'Servicio no encontrado')

        return service
    }

    listServices = async () => {
        return this.serviceRepository.getAll()
    }

    getService = async (id) => {
        return await this.validateAndGetService(id, true)
    }

    createService = async (service) => {
        return this.serviceRepository.create(service)
    }

    updateService = async (id, newService) => {
        await this.validateAndGetService(id)
        return this.serviceRepository.update(id, newService)
    }

    deleteService = async (id) => {
        await this.validateAndGetService(id)
        return this.serviceRepository.delete(id)
    }
}

export default ServiceService