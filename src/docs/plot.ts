
/**
 * @swagger
 * tags:
 *   - name: Plots
 *     description: Api definitions for Plot collection
 */

/**
 * @swagger
 *
 * /plots:
 *   get:
 *     summary: Get All User Plot
 *     tags: [Plots]
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /plots/{id}:
 *   get:
 *     summary: Get single plot by id
 *     tags: [Plots]
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *       - name: id
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /plots:
 *   post:
 *     tags: [Plots]
 *     summary: Create New Plot 
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - moistureRequirement
 *              - controlValve
 *              - moistureSensor
 *             properties:
 *               name:
 *                 type: string
 *               moistureRequirement:
 *                 type: string
 *               controlValve:
 *                 type: string
 *               moistureSensor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *       406:
 *         description: Input validation error
 *       500:
 *         description: Internal Server Error
 */

