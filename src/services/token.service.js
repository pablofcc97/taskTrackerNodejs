import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const ACCESS_TOKEN_TYPE = 'ACCESS_TOKEN';

class TokenService{
    generateToken = async (id, expiresIn, tokenType, data) => {
        const payload = {sub: id, type: tokenType, data}

        return jwt.sign(payload, config.jwt.secret, { expiresIn });
    }

    generateAuthTokens = async (user) => {
        const {accessTokenExpiration} = config.jwt
        const data = {id: user.id, email: user.email}
        const accessToken = await this.generateToken(user.id, accessTokenExpiration, ACCESS_TOKEN_TYPE, data)
    
        return {accessToken}
    }
}

export default TokenService