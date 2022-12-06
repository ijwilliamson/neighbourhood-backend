const { Router } = require("express");

const { loginUser } = require("./authController");

const authRouter = Router();

// Routes

/**
 * @swagger
 * /auth:
 *  post:
 *      tags:
 *          -   authentication
 *      description: Use to authorise user
 *      responses:
 *          '200':
 *              description: A successful response
 */

authRouter.post("/auth", loginUser);

module.exports = authRouter;
