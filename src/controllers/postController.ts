import { Request, Response, NextFunction } from "express";
import { db } from "./../database";

export const createPost = async (req: Request, res: Response) => {
  try {
    //create post
    const { title, content, user_id } = req.body;

    return res.status(201).json("post created successfully").send();
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("something went wrong").send();
  }
};

export const getUserPost = async (req: Request, res: Response) => {
  const postQuery = `SELECT * FROM posts WHERE user_id = ?`;
  try {
    const result = await db.query(postQuery, [+req.currentUserId]);
    return res.status(200).json(result[0]);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("Something went wrong");
  }
};
export const updatePost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const updatePostQuery = `SELECT id FROM posts WHERE id = ? AND user_id = ?`;

  try {
    const result = await db.query(updatePostQuery, [+id, +req.currentUserId]);
    if (Array.isArray(result[0]) && result[0].length === 0)
      return res.status(404).json("No post found");
    const [post] = result[0] as { id: number }[];
    const updateQuery = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
    await db.query(updateQuery, [title, content, post.id]);

    return res.status(200).json("updated successfully");
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json("Something went wrong");
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const { currentUserId } = req;
  const postId = req.params.id;
  const selectPostQuery = `SELECT id FROM posts WHERE id = ? AND user_id = ?`;
  const deletePostQuery = `DELETE FROM posts WHERE id = ?`;

  try {
    const post = await db.query(selectPostQuery, [postId, +currentUserId]);
    if (!post[0]) return res.status(404).json("No post found");
    await db.query(deletePostQuery, [+postId]);
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
