import { ONE_DAY, ONE_WEEK, FORTY_WEEKS } from '../constants/time.js';

export const calcPregnancyInfo = ({ startDate, dueDate }) => {
  const now = new Date();
  const start = new Date(startDate);

  const diffDays = Math.floor((now - start) / ONE_DAY);
  const currentWeek = Math.max(1, Math.ceil(diffDays / ONE_WEEK));

  let daysToBirth;

  if (dueDate) {
    daysToBirth = Math.max(0, Math.ceil((new Date(dueDate) - now) / ONE_DAY));
  } else {
    daysToBirth = Math.max(
      0,
      Math.ceil((FORTY_WEEKS - (now - start)) / ONE_DAY),
    );
  }

  return { currentWeek, daysToBirth };
};
