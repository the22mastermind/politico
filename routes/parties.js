import express from 'express';
import controller from '../controllers/parties';

const router = express.Router();

router.post('/', controller.createParty);
router.get('/', controller.viewAllParties);

export default router;
