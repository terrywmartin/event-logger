const { randomBytes, scryptSync } = require('crypto')

exports.generateKey = async (size = 32, format = 'base64') => {
  const buffer = await randomBytes(size)
  return buffer.toString(format)
}

exports.generateSecretHash = async (key) => {
  const salt = await randomBytes(8).toString('hex')
  const buffer = await scryptSync(key, salt, 64) 
  return `${buffer.toString('hex')}.${salt}`
}

exports.generatePrefix = async () => {
    const buffer = await randomBytes(5).toString('hex')

    return buffer
}
