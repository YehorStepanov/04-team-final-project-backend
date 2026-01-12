import { Diary } from '../models/diary.js';
import createHttpError from 'http-errors';

export const getDiaryEntries = async (req, res) => {
  const userId = req.user._id;

  const entries = await Diary.find({ userId }).sort({ date: -1 });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved diary entries!',
    data: entries,
  });
};

export const createDiaryEntry = async (req, res) => {
  const userId = req.user._id;
  const diaryData = { ...req.body, userId };

  const newEntry = await Diary.create(diaryData);

  res.status(201).json({
    status: 201,
    message: 'Diary entry created successfully!',
    data: newEntry,
  });
};

export const updateDiaryEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const updatedEntry = await Diary.findOneAndUpdate(
    { _id: id, userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedEntry) {
    throw createHttpError(404, 'Diary entry not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Diary entry updated successfully!',
    data: updatedEntry,
  });
};

export const deleteDiaryEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deletedEntry = await Diary.findOneAndDelete({ _id: id, userId });

  if (!deletedEntry) {
    throw createHttpError(404, 'Diary entry not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Diary entry deleted successfully!',
    data: deletedEntry,
  });
};