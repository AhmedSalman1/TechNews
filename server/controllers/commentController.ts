import {
  CreateCommentReq,
  CreateCommentRes,
  DeleteCommentRes,
  DeleteCommentReq,
} from '../api';
import { db } from '../datastore';
import { CustomHandler, Comment } from '../types';
import crypto from 'crypto';

export const createComment: CustomHandler<
  CreateCommentReq,
  CreateCommentRes
> = async (req, res) => {
  if (req.body.postId === '' || req.body.postId === undefined)
    return res.status(400).send({ error: 'No Post Id' });

  if (req.body.userId === '' || req.body.userId === undefined)
    return res.status(400).send({ error: 'No User Id' });

  if (req.body.comment === '' || req.body.comment === undefined)
    return res.status(400).send({ error: 'No Comment' });

  const commentForInsertion: Comment = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    postId: req.body.postId,
    userId: req.body.userId,
    comment: req.body.comment,
  };
  await db.createComment(commentForInsertion);
  return res.sendStatus(200);
};

export const deleteCommentHandler: CustomHandler<
  DeleteCommentReq,
  DeleteCommentRes
> = async (req, res) => {
  if (req.body.commentId === '' || req.body.commentId === undefined)
    return res.status(404).send({ error: 'No Comment Id' });
  await db.deleteComment(req.body.commentId);
  return res.sendStatus(200);
};
