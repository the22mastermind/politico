import express from 'express';
import controller from '../controllers/offices';

const router = express.Router();

router.post('/', controller.createOffice);
router.get('/', controller.viewAllOffices);

export default router;
