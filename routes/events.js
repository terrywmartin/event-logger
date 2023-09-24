const express = require('express')

const { 
    pingServer,
    createEvent,
    getEventById,
    getEvents,
    getEventsByProjectId
    
} = require('../controllers/events')

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
 *     Events:
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
 * /api/v1/events/ping:
 *    get:
 *      summary: Get response from the server 
 *      tags:
 *        - Events
 *      responses:
 *        "200":
 *          description: Get response from active server
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Pong'
 *        
 */

router.get('/ping', pingServer)

/**
 * @swagger
 * /api/v1/events:
 *    get:
 *      summary: Get all events
 *      tags:
 *        - Projects
 *      responses:
 *        "200":
 *          description: Return all events
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Event'
 *        
 */
router.get('', getEvents)

/**
 * @swagger
 * /api/v1/events/project/{project_id}:
 *    get:
 *      summary: Get events for a project
 *      tags:
 *        - Events
 *      parameters:
 *        - in: path
 *          name: project_id
 *          description: Project ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "200":
 *          description: Events for a specific project
 *          content:
 *            application/json:
 *              type: array
 *              items:
 *                schema:
 *                  $ref: '#/components/schemas/Event'
 *        
 */
router.get('project/:project_id', getEventsByProjectId)

/**
 * @swagger
 * /api/v1/events/{id}:
 *    get:
 *      summary: Get events by ID
 *      tags:
 *        - Events
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Event ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "200":
 *          description: Return event
 *          content:
 *            application/json:
 *              type: array
 *              items:
 *                schema:
 *                  $ref: '#/components/schemas/Event'
 *        
 */
router.get('/:id', getEventById)

/**
 * @swagger
 * /api/v1/projects:
 *    post:
 *      summary: Create event
 *      tags:
 *        - Events
 *      responses:
 *        "201":
 *          description: Event created
 *          
 */
router.post('', createEvent)

module.exports = router