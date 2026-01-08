import StateBaby from '../models/babyState.js';
import StateMom from '../models/momState.js';
import { calcPregnancyInfo } from '../utils/pregnancyCalc.js';
import { TOTAL_DAYS, DAYS_IN_WEEK } from '../constants/time.js';

export const getPublicWeekInfo = async (req, res) => {
  const weekNumber = Number(req.query.week ?? 1);

  const baby = await StateBaby.findOne({ weekNumber });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  const daysPassed = (weekNumber - 1) * DAYS_IN_WEEK;
  const daysToBirth = Math.max(0, TOTAL_DAYS - daysPassed);

  res.status(200).json({
    weekNumber,
    daysToBirth,
    baby: {
      analogy: baby.analogy,
      babySize: baby.babySize,
      babyWeight: baby.babyWeight,
      babyActivity: baby.babyActivity,
      image: baby.image,
    },
    momDailyTips: baby.momDailyTips?.[0] || null,
  });
};

export const getPrivateWeekInfo = async (req, res) => {
  const { dueDate } = req.user;

  const { currentWeek, daysToBirth } = calcPregnancyInfo({ dueDate });

  const baby = await StateBaby.findOne({ weekNumber: currentWeek });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  res.status(200).json({
    weekNumber: currentWeek,
    daysToBirth,
    baby: {
      analogy: baby.analogy,
      babySize: baby.babySize,
      babyWeight: baby.babyWeight,
      babyActivity: baby.babyActivity,
      image: baby.image,
    },
    momDailyTips: baby.momDailyTips?.[0] || null,
  });
};

export const getBabyDevelopment = async (req, res) => {
  const weekNumber = Number(req.query.week);

  if (!Number.isInteger(weekNumber) || weekNumber < 1) {
    return res.status(400).json({ message: 'Invalid week number' });
  }

  const baby = await StateBaby.findOne({ weekNumber });

  if (!baby) {
    return res.status(404).json({ message: 'Baby state not found' });
  }

  res.status(200).json({
    weekNumber,
    babyDevelopment: baby.babyDevelopment,
    interestingFact: baby.interestingFact,
  });
};

export const getMomState = async (req, res) => {
  const { week } = req.query;

  const weekNumber = Number(week);

  if (!Number.isInteger(weekNumber) || weekNumber < 1) {
    return res.status(400).json({ message: 'Invalid week number' });
  }

  const mom = await StateMom.findOne({ weekNumber });

  if (!mom) {
    return res.status(404).json({ message: 'Mom state not found' });
  }

  res.status(200).json({
    weekNumber,
    mom,
  });
};
