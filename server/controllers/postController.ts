import {
  CreatePostReq,
  CreatePostRes,
  DeletePostReq,
  DeletePostRes,
  GetPostRes,
  GetPostsReq,
  GetPostsRes,
  UpdatePostReq,
  UpdatePostRes,
} from '../api';
import { db } from '../datastore';
import { ExpressHandlerWithParams, CustomHandler, Post } from '../types';
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
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }

  const existing = await db.getPostByUrl(req.body.url);
  if (existing) {
    return res.status(400).send({ error: 'Post already exists' });
  }

  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
    postedAt: Date.now(),
  };

  await db.createPost(post);
  res.sendStatus(200);
};

export const updatePost: ExpressHandlerWithParams<
  { id: string },
  UpdatePostReq,
  UpdatePostRes
> = async (req, res) => {
  if (!req.params.id || !req.body.title || !req.body.url)
    return res.sendStatus(400);

  const updatedPost: Post = {
    id: req.params.id,
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
    postedAt: Date.now(),
  };

  db.updatePost(updatedPost);
  return res.sendStatus(200);
};

export const deletePost: ExpressHandlerWithParams<
  { id: string },
  DeletePostReq,
  DeletePostRes
> = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  db.deletePost(req.params.id);
  return res.sendStatus(200);
};

export const getPost: ExpressHandlerWithParams<
  { id: string },
  null,
  GetPostRes
> = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const postToReturn: Post | undefined = await db.getPost(req.params.id);
  return res.send({ post: postToReturn });
};
