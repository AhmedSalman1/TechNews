import express from 'express';
import { getMe, signIn, signUp, updateMe } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

router.use(authMiddleware);

router.get('/me', getMe);
router.patch('/me', updateMe);

export default router;
