import { Router } from 'express';

import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getTasksByUserId,
  createTask,
  updateTaskState,
} from '../controllers/tasksController.js';
import {
  createTaskSchema,
  stateTaskSchema,
} from '../validations/tasksValidation.js';

import ctrlWrapper from '../helper/ctrlWrapper.js';
const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.get('/api/tasks', ctrlWrapper(getTasksByUserId));
taskRouter.post(
  '/api/tasks',
  celebrate(createTaskSchema),
  ctrlWrapper(createTask),
);
taskRouter.patch(
  '/api/tasks/:id',
  celebrate(stateTaskSchema),
  ctrlWrapper(updateTaskState),
);

export default taskRouter;
