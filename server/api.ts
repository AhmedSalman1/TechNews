import { Comment, Post, User } from './types';

// Post APIs
export interface GetPostsReq {}
export interface GetPostsRes {
  posts: Post[];
}

export type CreatePostReq = Pick<Post, 'title' | 'url' | 'userId'>;
export interface CreatePostRes {}

export interface GetPostReq {}
export interface GetPostRes {
  post: Post;
}

export type DeletePostReq = { postId: string };
export type DeletePostRes = {};

// Comment APIs
export type CreateCommentReq = Pick<Comment, 'comment'>;
export interface CreateCommentRes {}

export type CountCommentsReq = { postId: string };
export type CountCommentsRes = { count: number };

export interface GetCommentsRes {
  comments: Comment[];
}

export type DeleteCommentRes = {};

// Like APIs
export interface GetAllLikesRes {
  likes: number;
}

// User APIs
export interface GetUserReq {}
export type GetUserRes = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'username'
>;
