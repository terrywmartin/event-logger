const express = require('express')

const router = new express.Router()

const {
    registerUser,
    loginUser,
    deleteUser,
    deleteAPIKey,
    activateUser,
    forgotPassword,
    updatePassword,
    createApiKey,
    getUserById

} = require('../controllers/auth')

const {
    authMiddleware
} = require('../middlewares/auth')

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
 * 
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
 *
 *     APIKey:
 *       type: object
 *       properties:
 *         apiKey: 
 *           type: string
 *           description: token
 *       example:  
 *         apiKey: afe8aewfw4.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * 
 *     CreateAPIKey:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name for the API Key
 *         project_id: 
 *           type: string
 *           description: Project to associate the API Key
 *       example:  
 *         name: example web app
 *         project_id: a602e62a-95d8-4d09-9eab-cb05645094ee
 *
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: Register a new user
 *      tags:
 *        - Auth
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: User and settings objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateUserDto'
 *        "500":
 *          description: Internal server error
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      summary: Login

 *      tags:
 *        - Auth
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: JWT and refresh token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginDto'
 *        "500":
 *          description: Internal server error
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /api/v1/auth/remove:
 *    delete:
 *      security:
 *        - BearerAuth: []
 *      summary: Removes user from the system
 *      tags:
 *        - Auth
 *      responses:
 *        "204":
 *          description: Current user is removed from the database
 *        "401":
 *          description: Not authenticated
 *        "500":
 *          description: Internal server error
 */
router.delete('/remove',  deleteUser)

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *    post:
 *      summary: Send email prompting user to change password
 *      tags:
 *        - Auth
 *      requestBody:
 *        description: Email and updated password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordDto'
 *      responses:
 *        "200":
 *          description: Reset password email will be sent
 *        "500":
 *          description: Internal server error
 */
router.post('/forgot-password', forgotPassword)

/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *    post:
 *      summary: Change user's password
 *      tags:
 *        - Auth
 *      parameters:
 *        - in: path
 *          name: token
 *          description: forgotten password token
 *          schema:
 *            $ref: "#/components/schemas/Token"
 *          required: true
 *      requestBody:
 *        description: Email and updated password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: JWT and refresh token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginDto'
 *        "500":
 *          description: Internal server error
 */
router.post('/reset-password/:token', updatePassword)

/**
 * @swagger
 * /api/v1/auth/activate/{token}:
 *    get:
 *      summary: Activate User's account
 *      tags:
 *        - Auth
 *      parameters:
 *        - in: path
 *          name: token
 *          description: User activation token
 *          schema:
 *            $ref: "#/components/schemas/Token"
 *          required: true
 *      responses:
 *        "200":
 *          description: User's account has been activated
 *        "500":
 *          description: Internal server error
 */
router.get('/activate/:token', activateUser)

/**
 * @swagger
 * /api/v1/auth/api-key:
 *    post:
 *      summary: Generate API key
 *      tags:
 *        - Auth
 *      requestBody:
 *        description: Create an API key for a project id
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAPIKey'
 *      responses:
 *        "201":
 *          description: API Key created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/APIKey'
 *        "500":
 *          description: Internal server error
 */
router.post('/api-key', createApiKey)

module.exports = router