"use strict";
// import joi from "joi";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.CreateUserInput = exports.CreateUserSchema = void 0;
// export const createUserSchema = joi.object({
//   body: joi.object({
//     firstname: joi.string().required(),
//     lastname: joi.string().required(),
//     username: joi.string().required(),
//     password: joi.string().required().min(6),
//     email: joi.string().required().email(),
//   }),
// });
class CreateUserSchema {
}
exports.CreateUserSchema = CreateUserSchema;
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
exports.CreateUserInput = typeof CreateUserSchema;
// export const loginUserSchema = joi.object({
//   body: joi.object({
//     username: joi.string().required(),
//     password: joi.string().required().min(6),
//   }),
// });
class loginUserSchema {
}
exports.loginUserSchema = loginUserSchema;
