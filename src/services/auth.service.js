import ApiError from '../utils/errorApi.js'


class AuthService{
    constructor(userRepository, oAuth2Client, tokenService, encriptionAdapter){
        this.userRepository = userRepository
        this.oAuth2Client =  oAuth2Client
        this.tokenService = tokenService
        this.encriptionAdapter = encriptionAdapter
    }

    signup = async (userBody) => {
        const {email, password, confirmPassword, name, lastname} = userBody

        //verify if email exists
        const existedUser = await this.userRepository.getOneByEmail(email)

        if(existedUser) throw new ApiError(400, 'El correo ya esta en uso')

        //hash password
        const hashedPassword = await this.encriptionAdapter.hashPassword(password)
        //const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

        //create the user
        await this.userRepository.create({email, password: hashedPassword, name, lastname})

    }

    validateUserByEmail = async (email) => {
        const existedUser = await this.userRepository.getOneByEmail(email)

        if (!existedUser) throw new ApiError(404, 'Credenciales incorrectas')

        return existedUser
    }

    validatePassword = async (password, hashedPassword) => {
        const passwordMatch = await this.encriptionAdapter.comparePassword(password, hashedPassword)
        //const passwordMatch = await bcrypt.compare(password, hashedPassword)

        if (!passwordMatch) throw new ApiError(404, 'Credenciales incorrectas')
    }

    


    login = async (authBody) => {
        const {email, password} = authBody

        //valdate if user exists
        const existedUser = await this.validateUserByEmail(email)

        //validate if the password is correct
        const hashedPassword = existedUser.password
        await this.validatePassword(password, hashedPassword)

        //generate tokens
        const tokens = await this.tokenService.generateAuthTokens(existedUser)

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
    
        return this.tokenService.generateAuthTokens(user)
    }
}

export default AuthService