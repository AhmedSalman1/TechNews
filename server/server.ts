import express from 'express';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';
import commentRouter from './routes/commentRoutes';
import likeRouter from './routes/likeRoutes';

dotenv.config();

const app = express();

(async () => {
  await initDb();

  app.use(express.json());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(loggerMiddleware);
  }

  app.get('/healthz', (req, res) => res.send({ status: '✅' }));
  app.use('/v1/users', asyncHandler(userRouter));
  app.use('/v1/posts', asyncHandler(postRouter));
  app.use('/v1/comments', asyncHandler(commentRouter));
  app.use('/v1/likes', asyncHandler(likeRouter));

  app.use(errHandler);

  if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port 3000');
    });
  }
})();

export default app;
