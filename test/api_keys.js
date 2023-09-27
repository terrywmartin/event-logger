const assert = require('assert')
const { randomBytes, scryptSync } = require('crypto')


const {
    generateKey,
    generatePrefix,
    generateSecretHash
} = require('../helpers/api_keys')


describe('generate API keys', () => {

    it('generate 10 character prefix', async () => {
        const expected = 10

        const prefix = await generatePrefix()

        assert.equal((await prefix).length, expected)

    })

    it('generate hash from API key', async () => {
        const testApiKey = '48d507423e.Ey/bUUYk0fZ8jBAUVag3/Ius1QJtJNaeywFNAE6ozEU='
        
        const salt = await randomBytes(8).toString('hex')
        const buffer = await scryptSync(testApiKey, salt, 64)
        const expectedApiKeyHash = `${buffer.toString('hex')}.${salt}`

        const resultHash = await generateSecretHash(testApiKey, salt)

        assert.equal(resultHash, expectedApiKeyHash)
        
    })

    it('verify API key hash and salt', async () => {
        
        const testApiKey = '48d507423e.Ey/bUUYk0fZ8jBAUVag3/Ius1QJtJNaeywFNAE6ozEU='
        const expectedApiKeyHash = 'a6449ae29ed842e9f098b8ebfa312d0beaca46f23c2d4648b1d1c619eb68d96fad7b6deff482bf980692ec3714fa8950100321b1353869b351185d1dc7ddabbe.99de2dc3929a790d'
        
        const expectedSalt = expectedApiKeyHash.split('.')[1]
        const expectedHash = expectedApiKeyHash.split('.')[0]

        const testApiKeyHash = await generateSecretHash(testApiKey, expectedSalt)

        assert.equal(testApiKeyHash.split('.')[0], expectedHash)
        assert.equal(testApiKeyHash.split('.')[1], expectedSalt)
        
    })

    
})