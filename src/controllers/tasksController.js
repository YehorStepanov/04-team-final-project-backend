import { Task } from '../models/tasks.js';

import createHttpError from 'http-errors';

export async function getTasksByUserId(req, res) {
  const userId = req.user._id;

  const tasks = await Task.find({ userId }).sort({ date: 1 });

  res.status(200).json({
    data: tasks,
  });
}

export async function createTask(req, res) {
  const dataTask = { ...req.body, userId: req.user._id };
  const newTask = await Task.create(dataTask);

  res.status(201).json({
    message: 'Task created',
    data: newTask,
  });
}

export async function updateTaskState(req, res) {
  const { id } = req.params;
  const { isDone } = req.body;
  const task = await Task.findOneAndUpdate(
    {
      _id: id,
    },
    { isDone },
    { new: true },
  );
  if (!task) {
    throw createHttpError(404, 'Task not found');
  }
  res.status(200).json({
    message: 'Status updated',
    data: task,
  });
}
