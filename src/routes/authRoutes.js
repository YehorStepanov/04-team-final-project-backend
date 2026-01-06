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
import ctrlWrapper from '../helper/ctrlWrapper.js';

const router = Router();

router.post(
  '/api/auth/register',
  celebrate(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/api/auth/login',
  celebrate(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post(
  '/api/auth/logout',
  authenticate,
  ctrlWrapper(logoutUserController),
);
router.post('/api/auth/refresh', ctrlWrapper(refreshSessionController));

export default router;
