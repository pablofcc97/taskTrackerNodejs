import TaskAdvanceRepository from "../repositories/taskAdvance.repository.js";
import TaskRepository from "../repositories/task.repository.js";
import ApiError from "../utils/errorApi.js";

class TaskAdvanceService{
    constructor(taskAdvanceRepository, taskRepository){
        this.taskAdvanceRepository = taskAdvanceRepository
        this.taskRepository = taskRepository
    }

    validateAndGetTaskAdvance = async (id) => {
        let taskAdvance

        //td: obtener con el avance ,etc
        taskAdvance = await this.taskAdvanceRepository.getById(id);

        if (!taskAdvance) throw new ApiError(404, 'Avance de Tarea no encontrado')

        return taskAdvance
    }

    calculateAndValidateMinutesWorked = (dateHourInit, dateHourEnd) => {
        const convertedDateHourInit = new Date(dateHourInit)
        const convertedDateHourEnd = new Date(dateHourEnd)

        if(convertedDateHourInit >= convertedDateHourEnd) throw new ApiError(404, 'La fecha de inicio debe ser menor a la fecha final')

        const minutesWorked = Math.floor((convertedDateHourEnd - convertedDateHourInit) / (1000 * 60));

        return minutesWorked
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

    updateTaskAdvance = async (id, newTaskAdvance) => {
        const taskAdvance = await this.validateAndGetTaskAdvance(id)
        
        const dateHourInit = newTaskAdvance.date_hour_init || taskAdvance.date_hour_init;
        const dateHourEnd = newTaskAdvance.date_hour_end || taskAdvance.date_hour_end;    

        if (dateHourInit && dateHourEnd) newTaskAdvance.minutes_worked = this.calculateAndValidateMinutesWorked(dateHourInit, dateHourEnd)

        return this.taskAdvanceRepository.update(id, newTaskAdvance)
    }

    deleteTaskAdvance = async (id) => {
        await this.validateAndGetTaskAdvance(id)
        return this.taskAdvanceRepository.delete(id)
    }
}

export default TaskAdvanceService