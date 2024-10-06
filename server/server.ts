import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
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
} from './controllers/commentController';
import { getLikes, createLike } from './controllers/likeController';

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
  app.delete('/v1/posts/:id', asyncHandler(deletePost));

  app.get('/v1/comments/:postId', asyncHandler(getComments));
  app.post('/v1/comments/new', asyncHandler(createComment));
  app.delete('/v1/comments/:commentId', asyncHandler(deleteComment));

  app.get('/v1/likes/:postId', asyncHandler(getLikes));
  app.post('/v1/likes/:postId', asyncHandler(createLike));

  app.use(errHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
  });
})();
