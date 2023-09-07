// import joi from "joi";

// export const createUserSchema = joi.object({
//   body: joi.object({
//     firstname: joi.string().required(),
//     lastname: joi.string().required(),
//     username: joi.string().required(),
//     password: joi.string().required().min(6),

//     email: joi.string().required().email(),
//   }),
// });

export class CreateUserSchema {
  body!: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  };
}
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        firstname:
 *          type: string
 *          default: Jane
 *        lastname:
 *          type: string
 *          default: Doe
 *        username:
 *          type: string
 *          default: doejohn
 *        password:
 *          type: string
 *          default: stringPassword123
 *
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *          type: string
 *          default: User created successfully
 */

/**
 * @openapi
 * '/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
export const CreateUserInput = typeof CreateUserSchema;

// export const loginUserSchema = joi.object({
//   body: joi.object({
//     username: joi.string().required(),
//     password: joi.string().required().min(6),
//   }),
// });

export class loginUserSchema {
  body!: { username: string; password: string };
}
/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: janeDoe
 *        password:
 *          type: string
 *          default: stringPassword123
 *
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */

/**
 * @openapi
 * '/user/signin':
 *  post:
 *     tags:
 *     - User
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserProfile:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        firstname:
 *          type: string
 *          default: Jane
 *        lastname:
 *          type: string
 *          default: Doe
 *        username:
 *          type: string
 *          default: doejohn
 *        password:
 *          type: string
 *          default: stringPassword123
 *
 *    UserProfileResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        firstname:
 *          type: string
 *          default: Jane
 *        lastname:
 *          type: string
 *          default: Doe
 *        username:
 *          type: string
 *          default: doejohn
 */
/**
 *@openapi
 * '/user/profile':
 *  get:
 *    tags:
 *    - User
 *    summary: Get user profile
 *    responses:
 *      200:
 *        description: Get profile of the current user
 *        content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/UserProfile'
 *      403:
 *        description: Forbidden
 */

export type LoginUserInput = typeof loginUserSchema;
