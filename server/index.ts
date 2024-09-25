import express from 'express';
import morgan from 'morgan';
import { createPost, getAllPosts } from './controllers/postController';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/v1/posts', getAllPosts);

app.post('/v1/posts', createPost);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
