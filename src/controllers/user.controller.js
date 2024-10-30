import UserService from '../services/user.service.js'
import { catchAsync } from '../utils/controller.js';

export default class UserController{
    constructor(userService){
        this.userService = userService
    }

    listUsers = catchAsync( async (req, res) => {
        const users = this.userService.listUsers()

        return res.status(200).json({
            status: 200,
            data: {
                users
            }
        })
    })

    updateUser = catchAsync( async (req, res) => {
        const {id} = req.params
        const {body} = req

        const user = await this.userService.updateUser(id, body)

        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    })

    getUser = catchAsync( async (req, res) => {
        const {id} = req.params
        const user = await this.userService.getUser(id)

        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    })

    deleteUser = catchAsync( async (req, res) => {
        const {id} = req.params
        const user = await this.userService.deleteUser(id)

        return res.status(204).end()
    })
}