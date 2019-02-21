import express from 'express';
import controller from '../controllers/votes';
import authenticate from '../middlewares/check-auth';
import isinteger from '../middlewares/check-integer';

const router = express.Router();

router.post('/', authenticate, controller.castVote);

export default router;