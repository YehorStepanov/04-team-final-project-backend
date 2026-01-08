import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../helper/ctrlWrapper.js';

import {
  getPublicWeekInfo,
  getPrivateWeekInfo,
  getBabyDevelopment,
  getMomState,
} from '../controllers/weeksController.js';

const router = Router();

router.get('/api/weeks/', ctrlWrapper(getPublicWeekInfo));

router.get('/api/weeks/current', authenticate, ctrlWrapper(getPrivateWeekInfo));
router.get('/api/weeks/baby', authenticate, ctrlWrapper(getBabyDevelopment));
router.get('/api/weeks/mom', authenticate, ctrlWrapper(getMomState));

export default router;
