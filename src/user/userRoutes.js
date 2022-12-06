const { Router } = require("express");
const { readUsers } = require("./userController");
const userRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The users Id
 *                  example: 1
 *              user_name:
 *                  type: string
 *                  description: The username
 *                  example: ijwilliamson
 *              email:
 *                  type: string
 *                  description: The users email address
 *                  example: ian@mail.com
 *              password:
 *                  type: string
 *                  description: The hashed password
 *                  example: 82374982374897239847djhfksjdhdfkjsdh
 *              pcd:
 *                  type: string
 *                  description: The users postcode
 *                  example: SW1A 1AA
 *              name:
 *                  type: string
 *                  description: The users name
 *                  example: Ian Williamson
 *              address:
 *                  type: string
 *                  description: The users address
 *                  example: 1 Downing Street
 */

/**
 * @swagger
 * /user:
 *  get:
 *      tags:
 *          -   user
 *      description: Use to get a list of users
 *      responses:
 *      '200':
 *          description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *        '500':
 *          description: An error response
 *              content:
 *               application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                      message:
 *                         type: string
 *                       description: The error message
 *                      example: Internal server error
 */
userRouter.get("/users", readUsers);
/**
 * @swagger
 * /user/{:id}
 * get:
 *     tags:
 *        - user
 *     description: Use to get a single user
 *     parameters:
 *          - in: path
 *          name: id
 *      schema:
 *          type: integer
 *           required: true
 *          description: The user id
 *          responses:
 *              '200':
 *                  description: A successful response
 *                  content:
 *                  application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/User'
 *               '500':
 *                    description: An error response
 *                       content:
 *                           application/json:
 *                       schema:
 *                            type: object
 *                              properties:
 *                          message:
 *                                  type: string
 *                              description: The error message
 *                              example: Internal server error
 *
 *
 */
userRouter.get("/user/:id", readUser);
/**
 * @swagger
 * /user:
 *  post:
 *      tags:
 *          - user
 *      description: Use to create a new user
 *          requestBody:
 *              required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *      responses:
 *          '201':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          '500':
 *              description: An error response
 *              content:
 *                   application/json:
 *                       schema:
 *                          type: object
 *              properties:
 *                  message:
 *                      type: string
 *                          description: The error message
 *                          example: Internal server error
 */
userRouter.post("/user", createUser);
/**
 * @swagger
 * /user/{:id}
 *  put:
 *      tags:
 *          - user
 *      description: Use to update a user
 *          parameters:
 *              - in: path
 *          name: id
 *              schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *              requestBody:
 *              required: true
 *              content:
 *              application/json:
 *              schema:
 *              $ref: '#/components/schemas/User'
 *              responses:
 *      '200':
 *              description: A successful response
 *              content:
 *              application/json:
 *              schema:
 *              $ref: '#/components/schemas/User'
 *      '500':
 *              description: An error response
 *              content:
 *              application/json:
 *              schema:
 *              type: object
 *              properties:
 *              message:
 *              type: string
 *              description: The error message
 *              example: Internal server error
 */
userRouter.put("/user/:id", updateUser);
/**
 * @swagger
 * /user/{:id}
 *  delete:
 *      tags:
 *          - user
 *      description: Use to delete a user
 *      parameters:
 *          - in: path
 *      name: id
 *      schema:
 *          type: integer
 *              required: true
 *      description: The user id
 *          responses:
 *      '200':
 *          description: A successful response
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      '500':
 *          description: An error response
 *              content:
 *              application/json:
 *                   schema:
 *                      type: object
 *              properties:
 *              message:
 *              type: string
 *                  description: The error message
 *                  example: Internal server error
 */
userRouter.delete("/user/:id", deleteUser);

module.exports = userRouter;
