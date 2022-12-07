const { Router } = require("express");

const schoolRouter = Router();
const {
    readSchools,
    readSchool,
} = require("./schoolController");
/**
 * @swagger
 * components:
 *  schemas:
 *      School:
 *          type: object
 *          properties:
 *              Name:
 *                  type: string
 *                  description: The school name
 *                  example: The priory
 *              Type:
 *                  type: string
 *                  description: The School type
 *                  example: independent
 *              Phase:
 *                  type: string
 *                  description: The Schools Phase
 *                  example: primary
 *              Street:
 *                  type: string
 *                  description: The Schools Street
 *                  example: Frank street
 *              Locality:
 *                  type: string
 *                  description: The Schools locality
 *                  example: preston
 *              Address3:
 *                  type: string
 *                  description: The Schools address
 *                  example: test
 *              Town:
 *                  type: string
 *                  description: The Schools town
 *                  example: Layland
 *              County:
 *                  type: string
 *                  description: The Schools County
 *                  example: Lancashire
 *              Postcode:
 *                  type: string
 *                  description: The Schools postcode
 *                  example: PR2 3ND
 *              Website:
 *                  type: string
 *                  description: The Schools website
 *                  example: www.school.com
 *              Telephone:
 *                  type: string
 *                  description: The Schools telephone
 *                  example: 01245 452165
 *
 */

/**
 * @swagger
 * /schools/{regionId}:
 *  get:
 *      tags:
 *          - school
 *      description: Use to get schools in a region
 *      parameters:
 *      -   in: path
 *          name: regionId
 *          schema:
 *              type: integer
 *              required: true
 *              description: The region id
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/School'
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
schoolRouter.get(
    "/schools/:regionId",
    readSchools
);

/**
 * @swagger
 * /school/{name}:
 *  get:
 *      tags:
 *          - school
 *      description: Use to get a schools by name
 *      parameters:
 *      -   in: path
 *          name: name
 *          description: spaces replaced with +
 *          schema:
 *              type: string
 *              required: true
 *              description: The school name (spaces replaced with +)
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/School'
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
schoolRouter.get("/school/:name", readSchool);

module.exports = schoolRouter;
