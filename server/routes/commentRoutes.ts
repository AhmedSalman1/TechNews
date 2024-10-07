import express from 'express';
import {
  createComment,
  deleteComment,
  getComments,
  countComments,
} from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/:postId', getComments);
router.get('/count/:postId', countComments);
router.post('/:postId', createComment);
router.delete('/:commentId', deleteComment);

export default router;
