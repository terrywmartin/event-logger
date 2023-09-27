const chai = require('chai')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')

dotenv.config()
process.env.NODE_ENV = "test"

const db = require('../helpers/db')
const app = require('../app')


chai.use(chaiHttp)

describe('authenticate user', () => {

    user = {
        username: 'testUser',
        email: 'test@email.com',
        
    }
})