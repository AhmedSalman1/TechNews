import { CreateLikeRes, GetLikesRes } from '../api';
import { db } from '../datastore';
import { ExpressHandlerWithParams, Like } from '../types';

export const createLike: ExpressHandlerWithParams<
  { postId: string },
  null,
  CreateLikeRes
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'Post ID is missing' });
  }

  if (!(await db.getPost(req.params.postId))) {
    return res.status(404).send({ error: 'No post found with this ID' });
  }

  let found = await db.exists({
    postId: req.params.postId,
    userId: res.locals.userId,
  });
  if (found) {
    return res
      .status(400)
      .send({ error: 'No more likes for same post, same userId' });
  }

  //Valid like Object
  const likeForInsert: Like = {
    postId: req.params.postId,
    userId: res.locals.userId,
  };

  db.createLike(likeForInsert);
  return res.sendStatus(200);
};

export const getLikes: ExpressHandlerWithParams<
  { postId: string },
  null,
  GetLikesRes
> = async (req, res) => {
  if (!req.params.postId) {
    return res.status(400).send({ error: 'Post ID is missing' });
  }
  const likes: Like[] = await db.getLikes(req.params.postId);
  return res.send({ likes: likes.length });
};
