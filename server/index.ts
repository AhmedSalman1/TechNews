import express from 'express';
import morgan from 'morgan';
import { db } from './datastore';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/posts', (req, res) => {
  res.status(200).json({
    posts: db.getPosts(),
  });
});

app.post('/posts', (req, res) => {
  const post = req.body;
  db.createPost(post);

  res.status(200).json({
    success: true,
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
