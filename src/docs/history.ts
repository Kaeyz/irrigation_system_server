
/**
 * @swagger
 * tags:
 *   - name: Moisture History
 *     description: Api definitions for moisture history collection
 */

/**
 * @swagger
 *
 * /history/{plotId}:
 *   get:
 *     summary: Get All plot history
 *     tags: [Moisture History]
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *       - name: plotId
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Internal Server Error
 */