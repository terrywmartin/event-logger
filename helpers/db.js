require('dotenv').config()

const { Pool } = require('pg')

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const db = new Pool({
    connectionString: connectionString,
    ssl: false,
})

module.exports = { db }