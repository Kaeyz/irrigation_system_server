
/**
 * @swagger
 * tags:
 *   - name: Devices
 *     description: Api definitions for Device collection
 */

/**
 * @swagger
 *
 * /devices:
 *   get:
 *     summary: Get All devices
 *     tags: [Devices]
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
 * /devices/{serialNumber}:
 *   get:
 *     summary: Get All devices
 *     tags: [Devices]
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *       - name: serialNumber
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
 * /devices:
 *   post:
 *     tags: [Devices]
 *     summary: Create New Device 
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
 *              - serialNumber
 *              - type
 *             properties:
 *               serialNumber:
 *                 type: string
 *               type:
 *                 type: string
 *                 example: moistureSensor|controlValve
 *     responses:
 *       200:
 *         description: Success response
 *       406:
 *         description: Input validation error
 *       500:
 *         description: Internal Server Error
 */

