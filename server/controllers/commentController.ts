import {
  CreateCommentReq,
  CreateCommentRes,
  DeleteCommentRes,
  DeleteCommentReq,
  GetCommentsRes,
  CountCommentsRes,
} from '../api';
import { db } from '../datastore';
import { ExpressHandlerWithParams, Comment } from '../types';
import crypto from 'crypto';

export const createComment: ExpressHandlerWithParams<
  { postId: string },
  CreateCommentReq,
  CreateCommentRes
> = async (req, res) => {
  if (!req.params.postId)
    return res.status(400).send({ error: 'Post ID is missing' });

  if (!req.body.comment)
    return res.status(400).send({ error: 'Comment is missing' });

  if (!(await db.getPost(req.params.postId, res.locals.userId))) {
    return res.status(404).send({ error: 'No post found with this ID' });
  }

  const commentForInsertion: Comment = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    postId: req.params.postId,
    userId: res.locals.userId,
    comment: req.body.comment,
  };
  await db.createComment(commentForInsertion);
  return res.sendStatus(200);
};

export const deleteComment: ExpressHandlerWithParams<
  { commentId: string },
  DeleteCommentReq,
  DeleteCommentRes
> = async (req, res) => {
  if (!req.params.commentId)
    return res.status(404).send({ error: 'Comment ID is missing' });
  await db.deleteComment(req.params.commentId);
  return res.sendStatus(200);
};

export const getComments: ExpressHandlerWithParams<
  { postId: string },
  null,
  GetCommentsRes
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'Post ID is missing' });
  }
  const comments = await db.getComments(req.params.postId);
  return res.send({ comments });
};

export const countComments: ExpressHandlerWithParams<
  { postId: string },
  null,
  CountCommentsRes
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'Post ID is missing' });
  }
  const count = await db.countComments(req.params.postId);
  return res.send({ count });
};
