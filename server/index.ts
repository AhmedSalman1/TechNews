import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import { createPost, getAllPosts } from './controllers/postController';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { signIn, signUp } from './controllers/userController';

(async () => {
  await initDb();
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/v1/posts', asyncHandler(getAllPosts));
  app.post('/v1/posts', asyncHandler(createPost));

  app.post('/v1/signup', asyncHandler(signUp));
  app.post('/v1/signin', asyncHandler(signIn));

  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      error: 'an unexpected error occurred, please try again',
    });
  };
  app.use(errHandler);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
})();
