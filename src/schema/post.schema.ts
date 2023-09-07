/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - user_id
 *      properties:
 *        title:
 *          type: string
 *          default: Nice jokes
 *        content:
 *          type: string
 *          default: This is the best nice jokes
 *        user_id:
 *          type: number
 *          default: 1
 *
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        _d:
 *          type: string
 *        user_id:
 *          type:string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * '/blog_post':
 *  post:
 *     tags:
 *     - Post
 *     summary: Create a post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

export class CreatePostSchema {
  body: { title: string; content: string; user_id: string } | undefined;
}

export const CreatePostInput = typeof CreatePostSchema;
