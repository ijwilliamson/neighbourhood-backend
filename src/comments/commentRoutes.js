const { Router } = require("express");
const commentRouter = Router();

const {
    validateToken,
} = require("../middleware/authentication");

const {
    createComment,
    getComments,
    deleteComment,
} = require("./commentController");

/**
 * @swagger
 * components:
 *  schemas:
 *      Comment:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the comment
 *                  example: 1
 *              PostId:
 *                  type: integer
 *                  description: The id of the post
 *                  example: 123
 *              userId:
 *                  type: integer
 *                  description: The id of the user
 *                  example: 1
 *              content:
 *                  type: string
 *                  description: The content of the comment
 *                  example: "This is a comment"
 *
 *      NewComment:
 *          type: object
 *          properties:
 *              PostId:
 *                  type: integer
 *                  description: The id of the post
 *                  example: 123
 *              userId:
 *                  type: integer
 *                  description: The id of the user
 *                  example: 1
 *              content:
 *                  type: string
 *                  description: The content of the comment
 *                  example: "This is a comment"
 */

/**
 * @swagger
 * /comment:
 *  post:
 *      tags:
 *          - comment
 *      description: Use to create a comment
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewComment'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
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

commentRouter.post(
    "/comment",
    validateToken,
    createComment
);

/**
 * @swagger
 * /comment/{PostId}:
 *  get:
 *      tags:
 *          - comment
 *      description: Use to request a posts comments
 *      parameters:
 *      -   in: path
 *          name: PostId
 *          schema:
 *              type: integer
 *              required: true
 *              description: The posts id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Comment'
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

commentRouter.get(
    "/comment/:PostId",
    validateToken,
    getComments
);

/**
 * @swagger
 * /comment/{id}:
 *  delete:
 *      tags:
 *          - comment
 *      description: Use to delete a comment
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The comment id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The message
 *                                  example: Comment deleted successfully
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

commentRouter.delete(
    "/comment/:id",
    validateToken,
    deleteComment
);

module.exports = commentRouter;
