import express from 'express';
import model from '../controllers/users';

const router = express.Router();

router.post('/signup', model.userSignup);
router.get('/', model.fetchAllUsers);

export default router;
