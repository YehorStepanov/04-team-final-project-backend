export const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const calcPregnancyInfo = ({ startDate, dueDate }) => {
  const now = new Date();

  const start = new Date(startDate);
  const diffDays = Math.floor((now - start) / MS_IN_DAY);

  const currentWeek = Math.max(1, Math.ceil(diffDays / 7));

  let daysToBirth = null;

  if (dueDate) {
    daysToBirth = Math.max(0, Math.ceil((new Date(dueDate) - now) / MS_IN_DAY));
  } else {
    const TOTAL_DAYS = 280;
    daysToBirth = Math.max(0, TOTAL_DAYS - diffDays);
  }

  return { currentWeek, daysToBirth };
};
