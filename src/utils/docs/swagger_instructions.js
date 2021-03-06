/*
1. add these templates to vscode snippets to make it easier to write the docs.
2. follow official documentation of swagger to leaarn more about these.
3. about the indentation inside swagger-comment, for some reason using 'tab' causes the app to crash,
   so use 'spaces' instead.
4. you will find a json file in this directory. copy it in files->preference->snippets->javascripts.json
*/

//snippet for model:
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           descriptions: this is optional!
 *         username:
 *           type: string
 *           uniqueItems: true
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         arrayExample:
 *           type: array
 *           items:
 *             type: number
 *         avatar:
 *           type: string
 *         verified:
 *           type: boolean
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: current-date
 *         level:
 *           type: number
 *           default: 0
 *       required:
 *         - username
 *         - password
 *         - level
 */

// snippet for controller:
/**
 * @swagger
 * /admin/user/:
 *   get:
 *     deprecated: false
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin-Users
 *     summary: Details of user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: jwt token
 *                 admin:
 *                   ref: '#/components/schemas/Admin'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Data Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
