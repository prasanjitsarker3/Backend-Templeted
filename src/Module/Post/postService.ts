/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../Error/AppError";
import { TBlogPost, TComment } from "./postInterface";
import { BlogPost } from "./postModel";

const createBlogPostIntoDB = async (payload: TBlogPost) => {
  const result = await BlogPost.create(payload);
  return result;
};

const userCommentBlogPost = async (commentId: string, payload: TComment) => {
  console.log(payload);
  const blogPost = await BlogPost.findById(commentId);
  if (!blogPost) {
    throw new AppError(404, "Blog post not found!");
  }
  blogPost.comment?.push(payload);
  const updatedBlogPost = await BlogPost.findByIdAndUpdate(
    commentId,
    { $push: { comment: payload } },
    { new: true }
  );
  return updatedBlogPost;
};

const singleCommentDeletedBlogPost = async (postId: string, commentId: any) => {
  const post = await BlogPost.findById(postId);
  if (post) {
    throw new AppError(404, "Blog Post Can't Find!");
  }
  const result = await BlogPost.findOneAndUpdate(
    { _id: postId },
    { $pull: { comment: { _id: commentId } } },
    { new: true }
  );

  if (!result) {
    throw new AppError(404, "Blog post not found");
  }
  return result;
};

const likeBlogPostUpdate = async (postId: string) => {
  const blogPost = await BlogPost.findById(postId);
  if (!blogPost) {
    throw new AppError(404, "Blog post not found!");
  }
  blogPost.like! += 1;
  const updatedBlogPost = await BlogPost.findByIdAndUpdate(postId, blogPost, {
    new: true,
  });
  return updatedBlogPost;
};

export const blogPostService = {
  createBlogPostIntoDB,
  userCommentBlogPost,
  singleCommentDeletedBlogPost,
  likeBlogPostUpdate,
};
