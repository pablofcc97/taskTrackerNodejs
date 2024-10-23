import TaskAdvance from '../models/taskAdvance.model.js'
import BaseRepository from './repository.js'

class TaskAdvanceRepository extends BaseRepository{
    constructor(){
        super(TaskAdvance)
    }

    //All custom DB requests
}

export default TaskAdvanceRepository