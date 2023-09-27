require('dotenv').config()

const { Pool } = require('pg')
let dbName
let dbIPAddr
let dbPort

if (process.env.NODE_ENV === 'test'){
    dbName = `${process.env.DB_DATABASE}_test`
    dbIPAddr = `127.0.0.1`
    dbPort = '5432'
}
else {
    dbIPAddr = `${process.env.DB_HOST}`
    dbPort = `${process.env.DB_PORT}`
}

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${dbIPAddr}:${dbPort}/${dbName}`

const db = new Pool({
    connectionString: connectionString,
    ssl: false,
})

module.exports = { db }