import express from 'express';
import userRoutes from './users';
import partyRoutes from './parties';
import officeRoutes from './offices';
import voteRoutes from './votes';

const router = express.Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/parties', partyRoutes);
router.use('/api/v1/offices', officeRoutes);
router.use('/api/v1/votes', voteRoutes);

export default router;
