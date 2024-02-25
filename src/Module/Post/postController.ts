import catchAsync from "../../UtlitisFunc/catchAsync";
import sendResponse from "../../UtlitisFunc/sendResponse";
import { blogPostService } from "./postService";

const createUserBlogPost = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await blogPostService.createBlogPostIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog post create successfully !",
    data: result,
  });
});
const commentBlogPost = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const body = req.body;
  const result = await blogPostService.userCommentBlogPost(commentId, body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog post create successfully !",
    data: result,
  });
});
const commentDeletedBlogPost = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const result = await blogPostService.singleCommentDeletedBlogPost(
    postId,
    commentId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment Delete successfully !",
    data: result,
  });
});

const likeBlogPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await blogPostService.likeBlogPostUpdate(postId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Like update successfully !",
    data: result,
  });
});

export const blogPostController = {
  createUserBlogPost,
  commentBlogPost,
  commentDeletedBlogPost,
  likeBlogPost,
};
