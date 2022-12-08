const { Router } = require("express");
const {
    getRegionByPcd,
    getRegionById,
} = require("./regionController");

const regionRouter = Router();

// Routes

/**
 * @swagger
 * components:
 *  schemas:
 *      Region:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The region Id
 *                  example: 1
 *              region_name:
 *                  type: string
 *                  description: The region name
 *                  example: E00126744
 *              postcodes:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                     pcd:
 *                         type: string
 *                         description: The postcode
 *                         example: E1 1AA
 * 

 */

/**
 * @swagger
 * /region/pcd/{pcd}:
 *  get:
 *      tags:
 *          -   region
 *      description: Use to get a single region by postcode
 *      parameters:
 *      -   in: path
 *          name: pcd
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Region'
 */

regionRouter.get(
    "/region/pcd/:pcd",
    getRegionByPcd
);

/**
 * @swagger
 * /region/id/{id}:
 *  get:
 *      tags:
 *          -   region
 *      description: Use to get a single region by region Id
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Region'
 */
regionRouter.get("/region/id/:id", getRegionById);

module.exports = regionRouter;
