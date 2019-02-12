import express from 'express';
import userRoutes from './users';
import partyRoutes from './parties';
import officeRoutes from './offices';

const router = express.Router();

router.use('/api/v1/users', userRoutes);
router.use('/api/v1/parties', partyRoutes);
router.use('/api/v1/offices', officeRoutes);

export default router;
