import express from 'express';
import controller from '../controllers/offices';
import authenticate from '../middlewares/check-auth';
import isadmin from '../middlewares/check-role';
import isinteger from '../middlewares/check-integer';

const router = express.Router();

router.post('/', authenticate, isadmin, controller.createOffice);
router.get('/', controller.viewAllOffices);
router.get('/:id', isinteger, controller.viewSpecificOffice);
router.post('/:id/register', isadmin, isinteger, controller.registercandidate);
router.get('/:id/result', isinteger, controller.electionResult);

export default router;
