const { Router } = require("express");

const { loginUser } = require("./authController");
const {
    checkPass,
} = require("../middleware/authentication");

const authRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      AuthUser:
 *          type: object
 *          properties:
 *              user_name:
 *                  type: string
 *                  description: The Users username
 *                  example: patrickLloyd
 *              password:
 *                  type: string
 *                  description: The Users password
 *                  example: PuddingQuilt2*
 *      ValidUser:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  description: The users jwt token
 *                  example: ijdfsdjfk
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
 *              region:
 *                  type: object
 *                  description: The users region
 *                  example: [{region id: 1}]
 *
 *
 */
// Routes

/**
 * @swagger
 * /auth:
 *  post:
 *      tags:
 *          -   authentication
 *      description: Use to authorise user
 *
 *      requestBody:
 *          description: Create a new food
 *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AuthUser'
 *
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ValidUser'
 */

authRouter.post("/auth", checkPass, loginUser);

module.exports = authRouter;
