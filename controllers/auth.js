const jwt = require ('jsonwebtoken')
const argon2 = require('argon2')

const { db } = require('../helpers/db')
const { generateTokens } = require('../helpers/jwt')
const { generateKey, generatePrefix, generateSecretHash } = require('../helpers/api_keys')

exports.returnUser = (req, res) => {

    if (req.user) {

        return res.status(200).send({ user: 'user' })

    }

    return res.status(401).send({ msg: 'no user is logged in'})
}

exports.registerUser = async (req, res) => {

    if (!req.body.email || !req.body.password){
        return res.status(400).send({error: "Email and password are required."})
    }

    let { email, password, first_name, last_name } = req.body
    
    if (first_name === undefined) {
        first_name = ''
    }
    if (last_name === undefined) {
        last_name = ''
    }
    const getUserQuery = "SELECT id FROM users WHERE email = $1"
    const insertUserQuery = "INSERT INTO users (email, password, first_name, last_name, active) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name"
    
    try {
        const userExists = await db.query(getUserQuery, [ email ])

        if (userExists.rowCount != 0){
            return res.status(400).send({error: "User with that email already exists." })
        }
        
        const hashedPW = await argon2.hash(password)

        let response = await db.query(insertUserQuery, [email, hashedPW, first_name, last_name, true])

        if (response.rowCount != 0) {
            const user = response.rows[0]
            response = await db.query(insertSettingsQuery, [ 1, user.id ])
            let user_settings = null
            if ( response.rowCount != 0) {
                user_settings = response.rows[0]
            } 
            return res.status(201).send({ user, settings: user_settings })
        }
    }
    catch (err) {
        console.log(err)
       return res.status(500).send({error: err.message })
    }
}

exports.loginUser = async (req, res) => {

    if (req.headers.authorization != undefined){
        // 
    }
    if (!req.body.email || !req.body.password){
        return res.status(400).send({error: "Email and password are required."})
    }

    let { email, password } = req.body
    
    const getUserQuery = "SELECT email,password,first_name,last_name FROM users WHERE email = $1 AND active = true"
    let response = ''
    try {
        
        response = await db.query(getUserQuery, [ email ])

        if (response.rowCount === 0){
            return res.status(401).send({error: "Invalid username or password." })
        }
        const user = response.rows[0]
        const validPassword = await argon2.verify(user.password, password)

        if (validPassword) {
            delete user.password

            const tokens = await generateTokens(user);
            await storeToken(tokens.refreshToken)

            return res.status(200).send( tokens )
        }
        else {
            return res.status(401).send({error: "Invalid username or password." })
            
        }
    }
    catch (err) {
        console.log(err)
       return res.status(500).send({error: err.message })
    }
}


exports.logoutUser = (req, res) => {

    const {refreshToken} = req.body

    deleteToken(refreshToken)

    res.status(200).send({})
}

exports.forgotPassword =  (req, res) => {

    return res.status(200).send({ msg: 'forgot password'})
}

exports.updatePassword =  (req, res) => {

    return res.status(200).send({ msg: 'update password'})
}

exports.activateUser =  (req, res) => {

    return res.status(200).send( { msg: 'activate'})
}

exports.getUserById =  (req, res) => {

    return res.status(200).send( { msg: 'user by id'})
}

exports.deleteUser = (req, res) => {

    return res.status(204).send( { msg: 'delete user' })
}

exports.createApiKey = async (req, res) => {

    const prefix = await generatePrefix()

    const apiKey = await generateKey()
    
    const hashedApiKey = await generateSecretHash(apiKey)

    return res.status(201).send( { "apiKey": `${prefix}.${apiKey}`})

}

exports.deleteAPIKey = (req, res) => {

    return res.status(204).send( { msg: 'delete API Key'})
}
