import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getCurrentUserController,
  updateAvatarController,
  updateUserController,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../helper/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();

router.get(
  '/api/users/current',
  authenticate,
  ctrlWrapper(getCurrentUserController),
);

router.patch(
  '/api/users/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateAvatarController),
);

router.patch(
  '/api/users/update',
  authenticate,
  celebrate(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;
