const { Router } = require("express");

const {
    validateToken,
} = require("../middleware/authentication");

const postRouter = Router();
const {
    createPost,
    readPosts,
    readPost,
    updatePost,
    deletePost,
    readUserPost,
    readTypePost,
    searchPost,
    favoritePost,
    likePost,
} = require("./postController");

/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the post
 *                  example: 1
 *              post_type:
 *                  type: integer
 *                  description: The type of post
 *                  example: 1
 *              user_id:
 *                  type: integer
 *                  description: The id of the user
 *                  example: 1
 *              user_name:
 *                  type: string
 *                  description: the creators username
 *                  example: ijwilliamson
 *              created_at:
 *                  type: date
 *                  description: The post created Date
 *                  example: 2022-12-08 16:09:24
 *              post_content:
 *                  type: string
 *                  description: The content of the post
 *                  example: "This is a post"
 *              likes:
 *                  type: integer
 *                  description: The number of likes
 *                  example: 2
 *              fav:
 *                  type: bool
 *                  description: The current user has this post as a favorite
 *                  example: "1"
 *
 *      NewPost:
 *          type: object
 *          properties:
 *              post_type:
 *                  type: integer
 *                  description: The type of post
 *                  example: 1
 *              user_id:
 *                  type: integer
 *                  description: The id of the user
 *                  example: 1
 *              post_content:
 *                  type: string
 *                  description: The content of the post
 *                  example: "This is a post"
 *
 *      FavPost:
 *          type: object
 *          properties:
 *
 *              user_id:
 *                  type: integer
 *                  description: The id of the user
 *                  example: 1
 *              post_id:
 *                  type: integer
 *                  description: The id of the post
 *                  example: 2
 */

/**
 * @swagger
 * /post:
 *  post:
 *      tags:
 *          - post
 *      description: Use to create a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewPost'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
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

postRouter.post(
    "/post",
    validateToken,
    createPost
);

/**
 * @swagger
 * /post/favorite:
 *  post:
 *      tags:
 *          - post
 *      description: Use to create favorite / unfavorite a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FavPost'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FavPost'
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

postRouter.post(
    "/post/favorite",
    validateToken,
    favoritePost
);
/**
 * @swagger
 * /post/like:
 *  post:
 *      tags:
 *          - post
 *      description: Use to like a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FavPost'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FavPost'
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

postRouter.post(
    "/post/like",
    validateToken,
    likePost
);

/**
 * @swagger
 * /posts:
 *  get:
 *      tags:
 *          - post
 *      description: Use to request all posts
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
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

postRouter.get(
    "/posts",
    validateToken,
    readPosts
);

/**
 * @swagger
 * /post/{id}:
 *  get:
 *      tags:
 *          - post
 *      description: Use to request a post
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
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

postRouter.get(
    "/post/:id",
    validateToken,
    readPost
);

/**
 * @swagger
 * /posts/search/{search}:
 *  get:
 *      tags:
 *          - post
 *      description: Use to search for posts matching a search term
 *      parameters:
 *      -   in: path
 *          name: search
 *          schema:
 *              type: string
 *              required: true
 *              description: The search term
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
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

postRouter.get(
    "/posts/search/:search",
    validateToken,
    searchPost
);

/**
 * @swagger
 * /posts/user/{user_id}:
 *  get:
 *      tags:
 *          - post
 *      description: Use to request a users posts
 *      parameters:
 *      -   in: path
 *          name: user_id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
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

postRouter.get(
    "/posts/user/:user_id",
    validateToken,
    readUserPost
);

/**
 * @swagger
 * /posts/type/{post_type}:
 *  get:
 *      tags:
 *          - post
 *      description: Use to request posts by type
 *      parameters:
 *      -   in: path
 *          name: post_type
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post type id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
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

postRouter.get(
    "/posts/type/:post_type",
    validateToken,
    readTypePost
);

/**
 * @swagger
 * /post/{id}:
 *  put:
 *      tags:
 *          - post
 *      description: Use to update a post
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewPost'
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
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
 */
postRouter.put(
    "/post/:id",
    validateToken,
    updatePost
);

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *      tags:
 *          - post
 *      description: Use to delete a post
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: The post id
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
 *                                  example: Post deleted successfully
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

postRouter.delete(
    "/post/:id",
    validateToken,
    deletePost
);

module.exports = postRouter;
