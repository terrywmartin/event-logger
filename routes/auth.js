const express = require('express')

const router = new express.Router()

const {
    returnUser
} = require ('../controllers/auth')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 * 
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.  
 *         password:
 *           type: string
 *           description: User's password
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *       example:
 *         email: test@test.com
 *         password: Password123!
 *         first_name: First
 *         last_name: Last
 *        
 *     UserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         email:
 *           type: string
 *           description: User's email
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee
 *         email: test@test.com
 *     CreateUserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         email:
 *           type: string
 *           description: User's email
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee
 *         email: test@test.com,
 *         first_name: first
 *         last_name: last
 * 
 *     ForgotPasswordDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *       example:
 *         email: test@test.com
 * 
 *     Token:
 *       type: string
 *       description: token
 *       example:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * 
 *     LoginDto:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Json Web Token
 *         refreshToken:
 *           type: string
 *           description: Refresh token
 *       example:
 *         jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *    get:
 *      summary: Get the currently logged in user 
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: Returns User information
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserDto'
 *        "401":
 *          description: No user logged in
 */

router.get('/me', returnUser)

module.exports = router