"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getUserPost = exports.createPost = void 0;
const database_1 = require("./../database");
const createPost = async (req, res, next) => {
    try {
        //create post
        const { title, content, user_id } = req.body;
        const createPostQuery = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
        const values = [title, content, user_id];
        const result = await database_1.db.query(createPostQuery, values);
        return res.status(201).json("post created successfully").send();
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("something went wrong").send();
    }
};
exports.createPost = createPost;
const getUserPost = async (req, res, next) => {
    const userId = req.params;
    const postQuery = `SELECT * FROM posts WHERE user_id = ?`;
    try {
        const result = await database_1.db.query(postQuery, [+req.currentUserId]);
        return res.status(200).json(result[0]);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("Something went wrong");
    }
};
exports.getUserPost = getUserPost;
const updatePost = async (req, res, next) => {
    const { title, content } = req.body;
    const id = req.params.id;
    const updatePostQuery = `SELECT id FROM posts WHERE id = ? AND user_id = ?`;
    try {
        const result = await database_1.db.query(updatePostQuery, [+id, +req.currentUserId]);
        if (!result[0])
            return res.status(404).json("No post found");
        const updateQuery = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
        await database_1.db.query(updateQuery, [title, content, +id]);
        return res.status(200).json("updated successfully");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json("Something went wrong");
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res, next) => {
    const { currentUserId } = req;
    const postId = req.params.id;
    const selectPostQuery = `SELECT id FROM posts WHERE id = ? AND user_id = ?`;
    const deletePostQuery = `DELETE FROM posts WHERE id = ?`;
    try {
        const post = await database_1.db.query(selectPostQuery, [postId, +currentUserId]);
        if (!post[0])
            return res.status(404).json("No post found");
        await database_1.db.query(deletePostQuery, [+postId]);
        res.status(200).json({});
    }
    catch (error) {
        return res.status(500).json("Something went wrong");
    }
};
exports.deletePost = deletePost;
