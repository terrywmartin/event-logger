const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const cors = require('cors')
const morgan = require('morgan')

const PORT = dotenv.PORT || 4001

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

const docsRouter = require('./routes/docs')
const eventRouter = require('./routes/events')
const authRouter = require('./routes/auth')
const projectRouter = require('./routes/projects')

app.use('/api/v1/docs', docsRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/projects', projectRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app