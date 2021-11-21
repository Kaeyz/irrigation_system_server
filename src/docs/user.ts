
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Api definitions for User collection
 */

/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Create New User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *       406:
 *         description: Input validation error
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /users/admin:
 *   post:
 *     tags: [User]
 *     summary: Create New Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *       406:
 *         description: Input validation error
 *       500:
 *         description: Internal Server Error
 */