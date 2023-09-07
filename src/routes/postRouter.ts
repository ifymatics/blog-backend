import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import {
  createPost,
  deletePost,
  getUserPost,
  updatePost,
} from "../controllers";

const router = express.Router();

// POST /post
router.post("/", isLoggedIn, createPost);

/**
 * @openapi
 * '/blog_post':
 *  get:
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
router.get("/", isLoggedIn, getUserPost);

// PATCH /post
router.patch("/:id", isLoggedIn, updatePost);

// DELETE /post
router.delete("/:id", isLoggedIn, deletePost);

export { router as postRouter };
