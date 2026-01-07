import { Router } from 'express';

import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { getTasksByUserId } from '../controllers/tasksController.js';
import {
  createTaskSchema,
  getTaskSchema,
  stateTaskSchema,
} from '../validation/tasksValidation.js';

const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.get('/', celebrate(getTaskSchema), getTasksByUserId);
taskRouter.post('/', celebrate(createTaskSchema));
taskRouter.patch('/:id', celebrate(stateTaskSchema));
