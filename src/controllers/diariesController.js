import createHttpError from 'http-errors';
import { Diary } from '../models/diary.js';

//========== GET ==========
export const getDiaries = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    page = 1,
    perPage = 10,
    category,
    search,
    dateFrom,
    dateTo,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;

  const skip = (page - 1) * perPage;
  const diariesQuery = Diary.find({ owner }).populate('category', 'title');

  if (search) {
    diariesQuery.where({
      $text: { $search: search },
    });
  }

  if (category) {
    diariesQuery.where('category').equals(category);
  }

  if (dateFrom || dateTo) {
    diariesQuery.where('createdAt');
    if (dateFrom) diariesQuery.gte(new Date(dateFrom));
    if (dateTo) diariesQuery.lte(new Date(dateTo));
  }

  const sort = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const [totalItems, diaries] = await Promise.all([
    diariesQuery.clone().countDocuments(),
    diariesQuery.sort(sort).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    diaries,
  });
};

//========== GETBYID ==========
export const getDiaryById = async (req, res) => {
  const { diaryId } = req.params;
  const { _id: owner } = req.user;

  const diary = await Diary.findOne({ _id: diaryId, owner }).populate(
    'category',
    'title',
  );

  if (!diary) {
    throw createHttpError(404, 'Diary entry not found');
  }

  res.status(200).json(diary);
};

//========== POST ==========
export const createDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const diary = await Diary.create({
    ...req.body,
    owner,
  });

  res.status(201).json(diary);
};

//========== DELETE ==========
export const deleteDiary = async (req, res) => {
  const { diaryId } = req.params;
  const { _id: owner } = req.user;
  const diary = await Diary.findOneAndDelete({
    _id: diaryId,
    owner,
  });

  if (!diary) {
    throw createHttpError(404, 'Diary entry not found');
  }

  res.status(200).json(diary);
};

//========== UPDATE ==========
export const updateDiary = async (req, res) => {
  const { diaryId } = req.params;
  const { _id: owner } = req.user;
  const diary = await Diary.findOneAndUpdate(
    { _id: diaryId, owner },
    req.body,
    { new: true },
  );

  if (!diary) {
    throw createHttpError(404, 'Diary entry not found');
  }

  res.status(200).json(diary);
};
