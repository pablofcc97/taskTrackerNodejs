import Task from '../models/task.model.js'
import BaseRepository from './repository.js'

class TaskRepository extends BaseRepository{
    constructor(){
        super(Task)
    }

    //All custom DB requests
}

export default TaskRepository