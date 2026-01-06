import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import {
  getPublicWeekInfo,
  getPrivateWeekInfo,
  getBabyDevelopment,
  getMomState,
} from '../controllers/weeksController.js';

const router = Router();

router.get('/', getPublicWeekInfo);

router.get('/current', authenticate, getPrivateWeekInfo);
router.get('/baby', authenticate, getBabyDevelopment);
router.get('/mom', authenticate, getMomState);

export default router;
