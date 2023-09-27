const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config()

exports.generateJWT = async (user) => {

    const token = await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE})

    return token 
}

exports.generateTokens = async (user) => {

    const token = await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE})
    const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE})

    return { token, refreshToken }
}

exports.verifyJWT = async (token, secret) => {
    const response = await jwt.verify(token, secret)
    return response
}

exports.generateRefreshToken = async (user) => {
    const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE})
    return refreshToken
}

exports.refreshToken = async (token) => {
    
}
