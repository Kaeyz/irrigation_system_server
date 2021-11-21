
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Api definitions for User collection
 */

/**
 * @swagger
 *
 * /users/me:
 *   get:
 *     summary: Get Logged In User
 *     tags: [User]
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

/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags: [User]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - email
 *              - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
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
 * /users/forgot:
 *   post:
 *     tags: [User]
 *     summary: User Forgot password 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - email
 *             properties:
 *               email:
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
 * /users/verify:
 *   post:
 *     tags: [User]
 *     summary: User verify token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - token
 *             properties:
 *               token:
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
 * /users/reset-password:
 *   post:
 *     tags: [User]
 *     summary: Reset User Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - token
 *              - password
 *              - confirmPassword
 *             properties:
 *               token:
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