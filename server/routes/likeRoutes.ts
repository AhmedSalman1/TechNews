import express from 'express';
import {
  getLikes,
  createLike,
  deleteLike,
} from '../controllers/likeController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/:postId', getLikes);
router.post('/:postId', createLike);
router.delete('/:postId', deleteLike);

export default router;
