import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from './controllers/postController';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { signIn, signUp } from './controllers/authController';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import {
  createComment,
  deleteComment,
  getComments,
  countComments,
} from './controllers/commentController';
import { getLikes, createLike, deleteLike } from './controllers/likeController';

(async () => {
  await initDb();
  const app = express();
  dotenv.config();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(loggerMiddleware);

  // app.get('/healthz', (req, res) => res.send({ status: '✅' }));
  app.post('/v1/signup', asyncHandler(signUp));
  app.post('/v1/signin', asyncHandler(signIn));

  app.use(authMiddleware);

  app.get('/v1/posts', asyncHandler(getAllPosts));
  app.post('/v1/posts', asyncHandler(createPost));
  app.get('/v1/posts/:id', asyncHandler(getPost));
  app.patch('/v1/posts/:id', asyncHandler(updatePost));
  app.delete('/v1/posts/:id', asyncHandler(deletePost));

  app.get('/v1/comments/:postId', asyncHandler(getComments));
  app.get('/v1/comments/count/:postId', asyncHandler(countComments));
  app.post('/v1/comments/:postId', asyncHandler(createComment));
  app.delete('/v1/comments/:commentId', asyncHandler(deleteComment));

  app.get('/v1/likes/:postId', asyncHandler(getLikes));
  app.post('/v1/likes/:postId', asyncHandler(createLike));
  app.delete('/v1/likes/:postId', asyncHandler(deleteLike));

  app.use(errHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
  });
})();
