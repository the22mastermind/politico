import express from 'express';
import userRoutes from './users';
import partyRoutes from './parties';

const router = express.Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/parties', partyRoutes);

export default router;
