import ObservationRepository from "../repositories/observation.repository.js";
import ApiError from "../utils/errorApi.js";

class ObservationService{
    constructor(){
        this.observationRepository = new ObservationRepository()
    }

    validateAndGetObservation = async (id) => {
        let observation

        //td: obtener con el avance ,etc
        observation = await this.observationRepository.getById(id);

        if (!observation) throw new ApiError(404, 'Observación no encontrada')

        return observation
    }

    listObservations = async () => {
        return this.observationRepository.getAll()
    }

    getObservation = async (id) => {
        return await this.validateAndGetObservation(id)
    }

    createObservation = async (observation) => {
        return this.observationRepository.create(observation)
    }

    updateObservation = async (id, newObservation) => {
        await this.validateAndGetObservation(id)
        return this.observationRepository.update(id, newObservation)
    }

    deleteObservation = async (id) => {
        await this.validateAndGetObservation(id)
        return this.observationRepository.delete(id)
    }
}

export default ObservationService