/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:  
 *                      type: string
 *                  parent:
 *                      type: string      
 */

/**
 * @swagger
 * /category:
 *  post:
 *      summery: create new category
 *      tags: 
 *          -  Category
 *      requestBody:
 *          content:    
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 */

/**
 * @swagger
 * /category:
 *  get:
 *      summery: get all categories
 *      tags: 
 *          -  Category
 *      responses:
 *          200:
 *              description: success
 */