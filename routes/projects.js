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
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *         name:
 *           type: string
 *           description: Project name.  
 *         description:
 *           type: string
 *           description: Project description
 *         
 *       example:
 *         id: a602e62a-95d8-4d09-9eab-cb05645094ee 
 *         name: Event Logger
 *         password: Simple app to store events
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