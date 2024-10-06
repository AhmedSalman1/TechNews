import {
  CreateCommentReq,
  CreateCommentRes,
  DeleteCommentRes,
  DeleteCommentReq,
  GetCommentsRes,
} from '../api';
import { db } from '../datastore';
import { ExpressHandlerWithParams, Comment } from '../types';
import crypto from 'crypto';

export const createComment: ExpressHandlerWithParams<
  { postId: string },
  CreateCommentReq,
  CreateCommentRes
> = async (req, res) => {
  if (!req.body.postId)
    return res.status(400).send({ error: 'Post ID is missing' });

  if (!req.body.comment)
    return res.status(400).send({ error: 'Comment is missing' });

  if (!(await db.getPost(req.body.postId))) {
    return res.status(404).send({ error: 'No post found with this ID' });
  }

  const commentForInsertion: Comment = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    postId: req.body.postId,
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
    return res.status(404).send({ error: 'No Comment Id' });
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
