
exports.pingServer = (req, res) => {

    res.status(200).send({ msg: 'pong'})
}

exports.createEvent = (req, res) => {

    return res.status(201).send({ msg: 'created event' })
}

exports.getEvents = (req, res) => {

    return res.status(200).send({ msg: 'get events' })
}

exports.getEventById = (req, res) => {

    return res.status(200).send({ msg: 'get event' })
}

exports.getEventsByProjectId = (req, res) => {

    return res.status(200).send({ msg: 'get events by project' })
}

exports.getCategories = (req, res) => {

    return res.status(200).send({ msg: 'get categories' })
}

exports.getCategoryById = (req, res) => {

    return res.status(200).send({ msg: 'get category' })
}

exports.getRequiredKeys = (req, res) => {
    return res.status(200).send({ msg: 'get required keys' })
}

exports.getRequiredKeyById = (req, res) => {
    return res.status(200).send({ msg: 'get required key' })
}

exports.createRequiredKey = (req, res) => {
    return res.status(201).send({ msg: 'create required key' })
}

