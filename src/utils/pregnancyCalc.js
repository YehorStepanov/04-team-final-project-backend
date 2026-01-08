import { TOTAL_DAYS, ONE_DAY } from '../constants/time.js';

export const calcPregnancyInfo = ({ dueDate }) => {
  const now = new Date();
  const due = new Date(dueDate);

  const daysToBirth = Math.max(0, Math.ceil((due - now) / ONE_DAY));

  const daysPassed = TOTAL_DAYS - daysToBirth;

  const currentWeek = Math.min(40, Math.max(1, Math.ceil(daysPassed / 7)));

  return {
    currentWeek,
    daysToBirth,
  };
};
