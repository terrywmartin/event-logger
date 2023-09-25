const redis = require('redis')

let client 

(async () => {
    client = redis.createClient({url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`})
  
    client.on("error", (error) => console.error(`Redis Error : ${error}`));
  
    await client.connect();
  })();

const deleteToken = async (token) => {
    await client.del(String(token))
    return true
}

const storeToken = async (token) => {
    await client.set(String(token), 1)
}

const getToken = async (token) => {
    return await client.get(String(token))
}

const disconnectClient = async () => {
    await client.quit()
}
module.exports = { client, deleteToken, storeToken, getToken, disconnectClient}