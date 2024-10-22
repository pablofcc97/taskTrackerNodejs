import express from 'express'
import taskRouter from './task.router.js'
import authRouter from './auth.router.js';
import userRouter from './user.router.js';

const appRouter = express.Router();

appRouter.use(taskRouter)
appRouter.use(authRouter)
appRouter.use(userRouter)

export default appRouter