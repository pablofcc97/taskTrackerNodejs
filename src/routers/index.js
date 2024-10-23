import express from 'express'
import authRouter from './auth.router.js'
import userRouter from './user.router.js'
import serviceRouter from './service.router.js'
import taskRouter from './task.router.js'
import taskAdvanceRouter from './taskAdvance.router.js'
import photoRouter from './photo.router.js'
import observationRouter from './observation.router.js'

const appRouter = express.Router();

appRouter.use(authRouter)
appRouter.use(userRouter)
appRouter.use(serviceRouter)
appRouter.use(taskRouter)
appRouter.use(taskAdvanceRouter)
appRouter.use(photoRouter)
appRouter.use(observationRouter)

export default appRouter