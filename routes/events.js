const express = require('express')

const { 
    pingServer,
    createEvent,
    getEventById,
    getEvents,
    getEventsByProjectId,
    getCategories,
    getCategoryById,
    getRequiredKeys,
    getRequiredKeyById,
    createRequiredKey
    
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
 *         - category
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         category:
 *           type: string
 *           description: Event category  
 *         type:
 *           type: string
 *           description: Event type
 *         project_id:
 *           type: string
 *           description: Project Id the event is associated
 *         timestamp:
 *           type: timestamp
 *           description: Time event was logged
 *         data:
 *           type: string
 *           description: JSON payload
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee 
 *         category: authentication
 *         type: failed-login
 *         project_id: a602e62a-95d8-4d09-9eab-cb05645094ee 
 *         timestamp: 2023-09-24 10:54:32
 *         data: { 'username': 'johndoe', 'ip_address': '0.0.0.0' }
 *        
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: Category name
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee
 *         name: authentication
 * 
 *     EventType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: Type of event
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee,
 *         name: failed-login
 * 
 *     RequiredKey:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID        
 *         name:
 *           type: string
 *           description: required key
 *         project_id:
 *           type: string
 *           description: project the payload will originate
 *       example:
 *         id: a602e62a-95d8-4d0A-9eab-cb05645094ee 
 *         name: username
 *         project_id: a602e62a-95d8-4d09-9eab-cb05645094ee
 * 
 *     Pong:
 *       type: string
 *       description: Server Response
 *       example:  Server is running
 * */

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
 * /api/v1/events:
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

/**
 * @swagger
 * /api/v1/events/categories/{id}:
 *    get:
 *      summary: Get category by ID
 *      tags:
 *        - Events
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Category ID
 *          schema:
 *            $ref: "#/components/schemas/Id"
 *          required: true
 *      responses:
 *        "200":
 *          description: Return category
 *          content:
 *            application/json:
 *              type: array
 *              items:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *        
 */
router.get('/categories/:id', getCategoryById)

/**
 * @swagger
 * /api/v1/events/categories:
 *    get:
 *      summary: Get all categories
 *      tags:
 *        - Events
 *      responses:
 *        "200":
 *          description: Array of categories
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Category'
 *        
 */
router.get('', getCategories)

/**
 * @swagger
 * /api/v1/events/required-keys:
 *    get:
 *      summary: Get all required-keys
 *      tags:
 *        - Events
 *      responses:
 *        "200":
 *          description: Required keys
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/RequiredKeys'
 *        
 */
router.get('', getRequiredKeys)

/**
 * @swagger
 * /api/v1/events/required-keys/{id}:
 *    get:
 *      summary: Get required key by ID
 *      tags:
 *        - Events
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Required Key ID
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
 *                  $ref: '#/components/schemas/RequiredKey'
 *        
 */
router.get('/:id', getRequiredKeyById)

/**
 * @swagger
 * /api/v1/events/required-keys:
 *    post:
 *      summary: Create required key
 *      tags:
 *        - Events
 *      responses:
 *        "201":
 *          description: Required Key created
 *          
 */
router.post('', createRequiredKey)

module.exports = router