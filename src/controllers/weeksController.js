import StateBaby from '../models/babyState.js';
import StateMom from '../models/momState.js';
import { calcPregnancyInfo } from '../utils/pregnancyCalc.js';

export const getPublicWeekInfo = async (req, res) => {
  const { week = 1 } = req.query;

  const baby = await StateBaby.findOne({ weekNumber: Number(week) });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  res.json({
    weekNumber: baby.weekNumber,
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

  const { currentWeek, daysToBirth } = calcPregnancyInfo({
    startDate: pregnancyStartDate,
    dueDate,
  });

  const baby = await StateBaby.findOne({ weekNumber: currentWeek });

  res.json({
    weekNumber: currentWeek,
    daysToBirth,
    baby,
  });
};

export const getBabyDevelopment = async (req, res) => {
  const { pregnancyStartDate } = req.user;
  const { week } = req.query;

  let weekNumber;

  if (week) {
    weekNumber = Number(week);
  } else {
    const { currentWeek } = calcPregnancyInfo({
      startDate: pregnancyStartDate,
    });
    weekNumber = currentWeek;
  }

  const baby = await StateBaby.findOne({ weekNumber });

  if (!baby) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  res.json({
    weekNumber,
    development: baby.babyDevelopment,
    interestingFact: baby.interestingFact,
  });
};

export const getMomState = async (req, res) => {
  const { pregnancyStartDate } = req.user;
  const { week } = req.query;

  let weekNumber;

  if (week) {
    weekNumber = Number(week);
  } else {
    const { currentWeek } = calcPregnancyInfo({
      startDate: pregnancyStartDate,
    });
    weekNumber = currentWeek;
  }

  const mom = await StateMom.findOne({ weekNumber });

  if (!mom) {
    return res.status(404).json({ message: 'Week data not found' });
  }

  res.json({
    weekNumber,
    mom,
  });
};
