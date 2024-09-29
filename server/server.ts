import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import { createPost, getAllPosts } from './controllers/postController';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { signIn, signUp } from './controllers/authController';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
  await initDb();
  const app = express();
  dotenv.config();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(loggerMiddleware);

  app.post('/v1/signup', asyncHandler(signUp));
  app.post('/v1/signin', asyncHandler(signIn));

  app.use(authMiddleware);

  app.get('/v1/posts', asyncHandler(getAllPosts));
  app.post('/v1/posts', asyncHandler(createPost));

  app.use(errHandler);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
})();
