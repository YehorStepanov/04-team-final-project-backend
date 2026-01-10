import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';

import {
  getDiaries,
  getDiaryById,
  createDiary,
  deleteDiary,
  updateDiary,
} from '../controllers/diariesController.js';

import {
  getDiariesSchema,
  createDiarySchema,
  updateDiarySchema,
  diaryIdParamSchema,
} from '../validations/diariesValidation.js';

const router = Router();

router.use(authenticate);

router.get('/diaries', celebrate(getDiariesSchema), getDiaries);
router.get('/diaries/:diaryId', celebrate(diaryIdParamSchema), getDiaryById);
router.post('/diaries', celebrate(createDiarySchema), createDiary);
router.delete('/diaries/:diaryId', celebrate(diaryIdParamSchema), deleteDiary);
router.patch('/diaries/:diaryId', celebrate(updateDiarySchema), updateDiary);

export default router;
