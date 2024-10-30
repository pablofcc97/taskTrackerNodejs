import TaskRepository from "../repositories/task.repository.js";
import ServiceRepository from "../repositories/service.repository.js";
import TaskAdvanceRepository from "../repositories/taskAdvance.repository.js";
import ApiError from "../utils/errorApi.js";

class TaskService{
    constructor(taskRepository, serviceRepository, taskAdvanceRepository){
        this.taskRepository = taskRepository
        this.serviceRepository = serviceRepository
        this.taskAdvanceRepository = taskAdvanceRepository
    }

    validateAndGetTask = async (id) => {
        let task

        //td: obtener con el avance ,etc
        task = await this.taskRepository.getById(id);

        if (!task) throw new ApiError(404, 'Tarea no encontrada')

        return task
    }

    validateService = async (id) => {
        let service

        //td: obtener con el avance ,etc
        service = await this.serviceRepository.getById(id);

        if (!service) throw new ApiError(404, 'Servicio no disponible. Verificar')
    }

    calculateAndValidateMinutesWorked = (dateHourInit, dateHourEnd) => {
        const convertedDateHourInit = new Date(dateHourInit)
        const convertedDateHourEnd = new Date(dateHourEnd)

        if(convertedDateHourInit >= convertedDateHourEnd) throw new ApiError(404, 'La fecha de inicio debe ser menor a la fecha final')

        const minutesWorked = Math.floor((convertedDateHourEnd - convertedDateHourInit) / (1000 * 60));

        return minutesWorked
    }

    listTasks = async () => {
        return this.taskRepository.getAll()
    }

    getTask = async (id) => {
        return await this.validateAndGetTask(id)
    }

    createTask = async (task) => {
        task.minutes_worked = this.calculateAndValidateMinutesWorked(task.date_hour_init, task.date_hour_end)
        await this.validateService(task.service_id)

        const newTask = await this.taskRepository.create(task)

        const taskAdvance = {
            ...task, 
            date_hour_init: null, 
            date_hour_end: null,
            minutes_worked: null,
            state: "planificado",
            task_id: newTask.id,
        }
        this.taskAdvanceRepository.create(taskAdvance)

        return newTask
    }

    updateTask = async (id, newTask) => {
        const task = await this.validateAndGetTask(id)

        if(newTask.service_id) await this.validateService(newTask.service_id)
            
        if(newTask.date_hour_init && newTask.date_hour_end) {
            newTask.minutes_worked = this.calculateAndValidateMinutesWorked(newTask.date_hour_init, task.date_hour_end)
            return this.taskRepository.update(id, newTask)
        } 
        if(newTask.date_hour_init) newTask.minutes_worked = this.calculateAndValidateMinutesWorked(newTask.date_hour_init, task.date_hour_end)
        if(newTask.date_hour_end) newTask.minutes_worked = this.calculateAndValidateMinutesWorked(task.date_hour_init, newTask.date_hour_end)

        return this.taskRepository.update(id, newTask)
    }

    deleteTask = async (id) => {
        await this.validateAndGetTask(id)
        return this.taskRepository.delete(id)
    }
}

export default TaskService