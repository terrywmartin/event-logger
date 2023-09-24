

exports.createProject = (req, res) => {

    return res.status(201).send({ msg: 'created project' })
}

exports.getProjects = (req, res) => {

    return res.status(200).send({ msg: 'get projects' })
}

exports.getProjectById = (req, res) => {

    return res.status(200).send({ msg: 'get project' })
}

exports.updateProject = (req, res) => {

    return res.status(203).send({ msg: 'update project' })
}

exports.deleteProject = (req, res) => {

    return res.status(204).send({ msg: 'delete project' })
}