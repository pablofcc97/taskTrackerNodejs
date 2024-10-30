import ObservationRepository from "../repositories/observation.repository.js";
import TaskAdvanceRepository from "../repositories/taskAdvance.repository.js";
import ApiError from "../utils/errorApi.js";

class ObservationService{
    constructor(observationRepository, taskAdvanceRepository){
        this.observationRepository = observationRepository
        this.taskAdvanceRepository = taskAdvanceRepository
    }

    validateAndGetObservation = async (id) => {
        let observation

        //td: obtener con el avance ,etc
        observation = await this.observationRepository.getById(id);

        if (!observation) throw new ApiError(404, 'Observación no encontrada')

        return observation
    }

    validateTaskAdvance = async (id) => {
        let taskAdvance

        //td: obtener con el avance ,etc
        taskAdvance = await this.taskAdvanceRepository.getById(id);

        if (!taskAdvance) throw new ApiError(404, 'Avance no disponible. Verificar')
    }


    listObservations = async () => {
        return this.observationRepository.getAll()
    }

    getObservation = async (id) => {
        return await this.validateAndGetObservation(id)
    }

    createObservation = async (observation) => {
        await this.validateTaskAdvance(observation.task_advance_id)
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