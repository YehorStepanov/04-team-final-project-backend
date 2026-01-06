import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/api/auth/register',
  celebrate(registerUserSchema),
  registerUserController,
);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUserController);
router.post('/api/auth/logout', authenticate, logoutUserController);
router.post('/api/auth/refresh', refreshSessionController);

export default router;
