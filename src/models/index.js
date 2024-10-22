import {db} from '../utils/database.js'
import User from './user.model.js'
import Service from './service.model.js'
import Task from './task.model.js'
import TaskAdvance from './taskAdvance.model.js'
import Photo from './photo.model.js'
import Observation from './observation.model.js'

User.init(db)
Service.init(db)
Task.init(db)
TaskAdvance.init(db)
Photo.init(db)
Observation.init(db)

User.associate(db.models)
Service.associate(db.models)
Task.associate(db.models)
TaskAdvance.associate(db.models)
Photo.associate(db.models)
Observation.associate(db.models)
