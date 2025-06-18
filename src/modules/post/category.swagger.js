/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreatePost:
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
 *          UpdateCategory:
 *              type: object
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
 * /create:
 *  post:
 *      summary: create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201: 
 *              description: created
 */


/**
 * @swagger
 * /create/categories:
 *  get:
 *      summary: Get all categories
 *      tags: 
 *          -  Post
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /category/{id}:
 *  put:
 *      summary: Update category by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -  in: path
 *             name: id
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *      responses:
 *          201: 
 *              description: Updated Successfully
 */

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: Delete category by id
 *      tags: 
 *          -  Category
 *      parameters:
 *          -  in: path
 *             name: id
 *      responses:
 *          200:
 *              description: successfully
 */