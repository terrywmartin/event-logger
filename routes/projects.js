const express = require('express')

const { 
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjects
} = require('../controllers/projects')

const router = new express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 * 
 *   schemas:
 *     Project:
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
 *     Pong:
 *       type: string
 *       description: Server Response
 *       example:  Server is running
 *     
 *     Id:
 *       type: string
 *       description: UUID
 *       example:  a602e62a-95d8-4d09-9eab-cb05645094ee
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
 * /api/v1/projects:
 *    get:
 *      summary: Get projects
 *      tags:
 *        - Projects
 *      responses:
 *        "200":
 *          description: Get projects
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Project'
 *        
 */
router.get('', getProjects)

/**
 * @swagger
 * /api/v1/projects/{id}:
 *    get:
 *      summary: Get project
 *      tags:
 *        - Projects
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Project ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "200":
 *          description: Project returned if found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        
 */
router.get('/:id', getProjectById)

/**
 * @swagger
 * /api/v1/projects:
 *    post:
 *      summary: Create project
 *      tags:
 *        - Projects
 *      responses:
 *        "201":
 *          description: Create project
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        
 */
router.post('', createProject)

/**
 * @swagger
 * /api/v1/projects/{id}:
 *    put:
 *      summary: Update project
 *      tags:
 *        - Projects
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Project ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "203":
 *          description: Project updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 *        
 */
router.put('/:id', updateProject)

/**
 * @swagger
 * /api/v1/projects/{id}:
 *    delete:
 *      summary: Delete project
 *      tags:
 *        - Projects
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Project ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "204":
 *          description: Project deleted
 *          
 */
router.delete('/:id', deleteProject)

module.exports = router