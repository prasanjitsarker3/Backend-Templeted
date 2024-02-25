import express from "express";
import { blogPostController } from "./postController";

const router = express.Router();
router.post("/create-blog-post", blogPostController.createUserBlogPost);
router.put("/comment/:commentId", blogPostController.commentBlogPost);
router.delete(
  "/:postId/comment/:commentId",
  blogPostController.commentDeletedBlogPost
);
router.put("/like/:postId", blogPostController.likeBlogPost);
export const blogPostRoutes = router;
