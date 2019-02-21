import express from 'express';
import model from '../controllers/users';

const router = express.Router();

router.post('/auth/signup', model.userSignup);
router.post('/auth/login', model.userLogin);
router.get('/', model.fetchAllUsers);

export default router;
