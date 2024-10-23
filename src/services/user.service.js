import UserRepository from '../repositories/user.repository.js'
import ApiError from '../utils/errorApi.js'

class UserService{
    constructor(){
        this.userRepository = new UserRepository()
    }

    validateAndGetUser = async (id) => {
        let user

        //td: obtener con el avance ,etc
        user = await this.userRepository.getById(id)

        if(!user) throw new ApiError(404, 'usuario no encontrdo')
        
        return user
    }

    listUsers = async () => {
        return this.userRepository.getAll()
    }

    getUser = async (id) => {
        return await this.validateAndGetUser(id)
    }

    updateUser = async (id, newUser) => {
        await this.validateAndGetUser(id)
        return this.userRepository.update(id, newUser)
    }

    deleteUser = async (id) => {
        await this.validateAndGetUser(id)
        return this.userRepository.delete(id)
    }
}

export default UserService
