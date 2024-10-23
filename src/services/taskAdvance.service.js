import TaskAdvanceRepository from "../repositories/taskAdvance.repository.js";
import ApiError from "../utils/errorApi.js";

class TaskAdvanceService{
    constructor(){
        this.taskAdvanceRepository = new TaskAdvanceRepository()
    }

    validateAndGetTaskAdvance = async (id) => {
        let taskAdvance

        //td: obtener con el avance ,etc
        taskAdvance = await this.taskAdvanceRepository.getById(id);

        if (!taskAdvance) throw new ApiError(404, 'Avance de Tarea no encontrado')

        return taskAdvance
    }

    listTaskAdvances = async () => {
        return this.taskAdvanceRepository.getAll()
    }

    getTaskAdvance = async (id) => {
        return await this.validateAndGetTaskAdvance(id)
    }

    createTaskAdvance = async (taskAdvance) => {
        return this.taskAdvanceRepository.create(taskAdvance)
    }

    updateTaskAdvance = async (id, newTask) => {
        await this.validateAndGetTaskAdvance(id)
        return this.taskAdvanceRepository.update(id, newTask)
    }

    deleteTaskAdvance = async (id) => {
        await this.validateAndGetTaskAdvance(id)
        return this.taskAdvanceRepository.delete(id)
    }
}

export default TaskAdvanceService