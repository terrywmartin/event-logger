const assert = require('assert')
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const {
    generateJWT,
    generateTokens,
    verifyJWT,
    generateRefreshToken
} = require('../helpers/jwt')



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY5NTc0Nzk1MCwiZXhwIjoxNjk1NzQ4MjUwfQ.0WQSFKd6EXRvtFJJJb1kknGXKKdVUUQKuo_lEyTYlfM

describe('test JWT functions', () => {

    const user = {
        username: 'testUser',
        email: 'test@email.com'
    }


    it('verify JWT token user information', async () => {
        
        //const testJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY5NTc0Nzk1MCwiZXhwIjoxNjk1NzQ4MjUwfQ.0WQSFKd6EXRvtFJJJb1kknGXKKdVUUQKuo_lEyTYlfM"
        const testJWT = await generateJWT(user)
        const response = await verifyJWT(testJWT, process.env.JWT_SECRET)

        assert.equal(response.username, user.username)
        assert.equal(response.email, user.email)

    })

    it('verify refresh token user information', async () => {
        const testRefreshJWT = await generateRefreshToken(user)
        const response = await verifyJWT(testRefreshJWT, process.env.REFRESH_TOKEN_SECRET) 

        assert.equal(response.username, user.username)
        assert.equal(response.email, user.email)
    })

})