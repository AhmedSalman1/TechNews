import { Comment, Like, Post, User } from './types';

// Post APIs
export interface GetPostsReq {}
export interface GetPostsRes {
  posts: Post[];
}

export type CreatePostReq = Pick<Post, 'title' | 'url'>;
export interface CreatePostRes {}

export type GetPostReq = { postId: string };
export interface GetPostRes {
  post: Post;
}

export type DeletePostReq = { postId: string };
export type DeletePostRes = {};

// Comment APIs
export type CreateCommentReq = Pick<Comment, 'userId' | 'postId' | 'comment'>;
export interface CreateCommentRes {}

export type CountCommentsReq = { postId: string | undefined };
export type CountCommentsRes = { count: number };

export interface GetCommentsRes {
  comments: Comment[];
}

export type DeleteCommentReq = { commentId: string };
export type DeleteCommentRes = {};

// Like APIs
export type CreateLikeReq = Like;
export interface CreateLikeRes {}
export type GetLikesReq = { postId: string };
export interface GetLikesRes {
  likes: number;
}

// User APIs
export type SignUpReq = Pick<
  User,
  'firstName' | 'lastName' | 'username' | 'email' | 'password'
>;
export interface SignUpRes {
  jwt: string;
}

export interface SignInReq {
  login: string; // username or email
  password: string;
}

export type SignInRes = {
  user: Pick<User, 'firstName' | 'lastName' | 'username' | 'email' | 'id'>;
  jwt: string;
};

export interface GetUserReq {}
export type GetUserRes = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'username'
>;

export type GetCurrentUserReq = {};
export type GetCurrentUserRes = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'username' | 'email'
>;

export type UpdateCurrentUserReq = Partial<Omit<User, 'id' | 'email'>>;
export type UpdateCurrentUserRes = {};

export type GetUserByEmailReq = { emailId: string };
export interface GetUserByEmailRes {
  user: User;
}
export type GetUserByUserNameReq = {
  userName: string;
};
export interface GetUserByUserNameRes {
  user: User;
}
