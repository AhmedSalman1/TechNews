import { CreatePostReq, CreatePostRes, GetPostsReq, GetPostsRes } from '../api';
import { db } from '../datastore';
import { CustomHandler, Post } from '../types';
import crypto from 'crypto';

export const getAllPosts: CustomHandler<GetPostsReq, GetPostsRes> = (
  req,
  res,
) => {
  // throw new Error('oops');
  res.status(200).json({
    posts: db.getPosts(),
  });
};

// We don't need all fields
export const createPost: CustomHandler<CreatePostReq, CreatePostRes> = (
  req,
  res,
) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    postedAt: Date.now(),
  };

  db.createPost(post);
  res.status(200).json({
    success: true,
  });
};
