import { CreatePostReq, CreatePostRes, GetPostsReq, GetPostsRes } from '../api';
import { db } from '../datastore';
import { CustomHandler, Post } from '../types';
import crypto from 'crypto';

export const getAllPosts: CustomHandler<GetPostsReq, GetPostsRes> = async (
  req,
  res,
) => {
  // throw new Error('oops');
  res.status(200).json({
    posts: await db.getPosts(),
  });
};

// We don't need all fields
export const createPost: CustomHandler<CreatePostReq, CreatePostRes> = async (
  req,
  res,
) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }

  // TODO: validate user exists
  // TODO: get userId from session
  // TODO: validate title and url are non-empty
  // TODO: validate url is new, otherwise add +1 to existing post
  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  await db.createPost(post);
  res.status(200);
};
