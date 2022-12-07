const { Router } = require("express");
const {
    hashPass,
} = require("../middleware/authentication");
const {
    readUsers,
    readUser,
    createUser,
    updateUser,
    deleteUser,
} = require("./userController");
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
 *
 *      ReturnedUser:
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
 *              region_id:
 *                  type: id
 *                  description: The users region id
 *                  example: 1
 
 *      NewUser:
 *          type: object
 *          properties:
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
 *                  description: The users password
 *                  example: password
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
 * /users:
 *  get:
 *      tags:
 *          - user
 *      description: Use to get a list of foods
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ReturnedUser'
 *          '500':
 *              description: An error response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The error message
 *                                  example: Internal server error
 */
userRouter.get("/users", readUsers);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *      tags:
 *          - user
 *      description: Use to get a single user
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ReturnedUser'
 *          '500':
 *              description: An error response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The error message
 *                                  example: Internal server error
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewUser'
 *      responses:
 *          '201':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ReturnedUser'
 *              '500':
 *                  description: An error response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: The error message
 *                                      example: Internal server error
 */
userRouter.post("/user", hashPass, createUser);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *      tags:
 *          - user
 *      description: Use to update a user
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewUser'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ReturnedUser'
 *              '500':
 *                  description: An error response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: The error message
 *                                      example: Internal server error
 */
userRouter.put("/user/:id", hashPass, updateUser);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *      tags:
 *          - user
 *      description: Use to delete a user
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                 type: string
 *                                 description: The message
 *                                 example: User deleted
 *              '500':
 *                  description: An error response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: The error message
 *                                      example: Internal server error
 */
userRouter.delete("/user/:id", deleteUser);

module.exports = userRouter;
