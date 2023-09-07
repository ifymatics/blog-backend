"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
exports.postRouter = router;
// POST /post
router.post("/", isLoggedIn_1.isLoggedIn, postController_1.createPost);
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
router.get("/", isLoggedIn_1.isLoggedIn, postController_1.getUserPost);
// PATCH /post
router.patch("/:id", isLoggedIn_1.isLoggedIn, postController_1.updatePost);
// DELETE /post
router.delete("/:id", isLoggedIn_1.isLoggedIn, postController_1.deletePost);
