
exports.returnUser = (req, res) => {

    if (req.user) {

        return res.status(200).send({ user: 'user' })

    }

    return res.status(401).send({ msg: 'no user is logged in'})
}

exports.createUser = (req, res) => {

    return res.status(201).send({ msg: 'create user'})
}

exports.getUserById = (req, res) => {

    return res.status(200).send( { msg: 'user by id'})
}

exports.deleteUser = (req, res) => {

    return res.status(204).send( { msg: 'delete user' })
}

exports.createApiKey = (req, res) => {

    return res.status(201).send( { msg: 'create API Key'})

}

exports.deleteAPIKey = (req, res) => {

    return res.status(204).send( { msg: 'delete API Key'})
}
