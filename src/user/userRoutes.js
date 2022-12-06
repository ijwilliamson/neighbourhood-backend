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
 *                  example:82374982374897239847djhfksjdhdfkjsdh

/**
* @swagger
 * /user:
 *  get:
 *      tags:
 *          -   user
 *      description: Use to get a list of users
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.get("/users", readUsers);

module.exports = userRouter;
