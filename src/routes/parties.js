import express from 'express';
import controller from '../controllers/parties';
import authenticate from '../middlewares/check-auth';
import isadmin from '../middlewares/check-role';
import isinteger from '../middlewares/check-integer';

const router = express.Router();

router.post('/', authenticate, isadmin, controller.createParty);
router.get('/', controller.viewAllParties);
router.get('/:id', isinteger, controller.viewSingleParty);
router.patch('/:id', authenticate, isadmin, controller.editParty);
router.delete('/:id', authenticate, isadmin, controller.deleteParty);

export default router;
