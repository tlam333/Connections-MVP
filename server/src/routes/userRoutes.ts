import { Router } from 'express';
const userController = require('../controllers/userController');
const router = Router();

//creating profile
router.post('/profile', userController.register);

export default router;
