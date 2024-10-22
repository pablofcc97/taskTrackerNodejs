import TaskRepository from "../repositories/task.repository.js";
import ApiError from "../utils/errorApi.js";

class TaskService{
    constructor(){
        this.taskRepository = new TaskRepository()
    }

    validateAndGetTask = async () => {
        let task

        //td: obtener con el avance ,etc
        task = await this.taskRepository.getById(id);

        if (!task) throw new ApiError(404, 'Tarea no encontrada')

        return task
    }

    listTasks = async () => {
        return this.taskRepository.getAll()
    }

    createTask = async (task) => {
        return this.taskRepository.create(task)
    }

    updateTask = async (id, newTask) => {
        await this.validateAndGetTask(id)
        return this.taskRepository.update(id, newTask)
    }

    deleteTask = async (id) => {
        await this.validateAndGetTask(id)
        return this.taskRepository.delete(id)
    }
}

export default TaskService