const { verifyJWT } = require('../helpers/jwt')

const authMiddleware = async function (req, res, next) {

    if (req.headers.authorization === undefined){
        return res.status(403).send({ error: "Unauthorized." })
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const response = await verifyJWT(String(token), process.env.JWT_SECRET)
        console.log(response)
    } catch (err) {
        if (err.name === 'TokenExpiredError'){
            return res.status(403).send({ error: "Expired", message: "JWT is expired." })
        }
        else {
            return res.status(403).send({ error: err.name, message: err.message})
        }
    }

    next()

}

module.exports = { authMiddleware }