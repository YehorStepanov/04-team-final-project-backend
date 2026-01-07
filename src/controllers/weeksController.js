import StateBaby from '../models/babyState.js';
import StateMom from '../models/momState.js';
import { calcPregnancyInfo } from '../utils/pregnancyCalc.js';
import { ONE_WEEK } from '../constants/time.js';

export const getPublicWeekInfo = async (req, res) => {
  const weekNumber = Number(req.query.week ?? 1);

  const baby = await StateBaby.findOne({ weekNumber });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  const TOTAL_DAYS = 280;

  const daysPassed = (weekNumber - 1) * ONE_WEEK;
  const daysToBirth = Math.max(0, TOTAL_DAYS - daysPassed);

  res.status(200).json({
    weekNumber,
    daysToBirth,
    baby: {
      analogy: baby.analogy,
      size: baby.babySize,
      weight: baby.babyWeight,
      activity: baby.babyActivity,
      image: baby.image,
    },
    momTip: baby.momDailyTips?.[0] || null,
  });
};

export const getPrivateWeekInfo = async (req, res) => {
  const { pregnancyStartDate, dueDate } = req.user;

  if (!pregnancyStartDate) {
    return res.status(400).json({
      message: 'pregnancyStartDate is missing in user profile',
    });
  }

  const { currentWeek, daysToBirth } = calcPregnancyInfo({
    startDate: pregnancyStartDate,
    dueDate,
  });

  const baby = await StateBaby.findOne({ weekNumber: currentWeek });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  res.status(200).json({
    weekNumber: currentWeek,
    daysToBirth,
    baby,
  });
};

export const getBabyDevelopment = async (req, res) => {
  const weekNumber = Number(req.query.week);

  if (!weekNumber) {
    return res.status(400).json({ message: 'Week number is required' });
  }

  const baby = await StateBaby.findOne({ weekNumber });

  if (!baby) {
    return res.status(404).json({ message: 'Baby state not found' });
  }

  res.status(200).json({
    weekNumber,
    development: baby.babyDevelopment,
    interestingFact: baby.interestingFact,
  });
};

export const getMomState = async (req, res) => {
  const { week } = req.query;

  const weekNumber = Number(week);

  if (!weekNumber) {
    return res.status(400).json({ message: 'Week number is required' });
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
