import { CreateLikeReq, CreateLikeRes, GetLikesReq, GetLikesRes } from '../api';
import { db } from '../datastore';
import { CustomHandler, Like } from '../types';

export const createLike: CustomHandler<CreateLikeReq, CreateLikeRes> = async (
  req,
  res,
) => {
  if (!req.body.postId) {
    return res.status(400).send({ error: 'No Post Id' });
  }

  if (!req.body.userId) {
    return res.status(400).send({ error: 'No User Id' });
  }

  let found = await db.isDuplicateLike({
    postId: req.body.postId,
    userId: req.body.userId,
  });
  if (found) {
    return res
      .status(400)
      .send({ error: 'No more likes for same post, same userid' });
  }

  //Valid like Object
  const likeForInsert: Like = {
    postId: req.body.postId,
    userId: req.body.userId,
  };

  db.createLike(likeForInsert);
  return res.sendStatus(200);
};

export const getLikes: CustomHandler<GetLikesReq, GetLikesRes> = async (
  request,
  response,
) => {
  let params: any = request.params;
  const likes: Like[] = await db.getLikes(params.postId);
  return response.send({ likes: likes.length });
};
