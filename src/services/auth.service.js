import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user.repository.js'
import ApiError from '../utils/errorApi.js'
import config from '../utils/config.js'
import { OAuth2Client } from 'google-auth-library';

const SALT_ROUND = 10;
const ACCESS_TOKEN_TYPE = 'ACCESS_TOKEN';

class AuthService{
    constructor(){
        this.userRepository = new UserRepository()
        this.oAuth2Client =  new OAuth2Client(config.google.clientId, config.google.clientSecret, 'postmessage')
    }

    signup = async (userBody) => {
        const {email, password, confirmPassword} = userBody

        //verify if email exists
        const existedUser = await this.userRepository.getOneByEmail(email)

        if(existedUser) throw new ApiError(400, 'El correo ya esta en uso')
        if(password !== confirmPassword) throw new ApiError(400, 'Las contraseñas no coinciden')

        //hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

        //create the user
        await this.userRepository.create({email, password: hashedPassword})

    }

    validateUserByEmail = async (email) => {
        const existedUser = await this.userRepository.getOneByEmail(email)

        if (existedUser) throw new ApiError(404, 'Credenciales incorrectas')

        return existedUser
    }

    validatePassword = async (password) => {
        const passwordMatch = await bcrypt.compare(password, hashedPassword)

        if (!passwordMatch) throw new ApiError(404, 'Credeciales incorrectas')
    }

    generateToken = async (id, expiresIn, tokenType, data) => {
        const payload = {sub: id, type: tokenType, data}

        return jwt.sign(payload, config.jwt.secret, { expiresIn });
    }

    generateAuthTokens = async (user) => {
        const {accessTokenExpiration} = config.jwt
        const data = {id: user.id, email: user.email}
        const accessToken = this.generateToken(user.id, accessTokenExpiration, ACCESS_TOKEN_TYPE, data)
    
        return {accessToken}
    }

    login = async (authBody) => {
        const {email, password} = authBody

        //valdate if user exists
        const existedUser = await this.validateUserByEmail(email)

        //validate if the password is correct
        const hashedPassword = existedUser.password
        await this.validatePassword(password, hashedPassword)

        //generate tokens
        const tokens = this.generateAuthTokens(existedUser)

        return tokens
    }

    loginGoogle = async (code) => {
        const { tokens } = await this.oAuth2Client.getToken(code)
        const tokenInfo = await this.oAuth2Client.getTokenInfo(tokens.access_token)
    
        const { email } = tokenInfo
    
        const existedUser = await this.userRepository.getOneByEmail(email)
    
        let user
    
        if (existedUser) {
          user = existedUser
        } else {
          user = await this.userRepository.create({ email })
        }
    
        return this.generateAuthTokens(user)
    }
}

export default AuthService