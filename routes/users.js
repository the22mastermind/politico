import express from 'express';
import model from '../controllers/users';

const router = express.Router();

router.post('/signup', model.userSignup);

export default router;
