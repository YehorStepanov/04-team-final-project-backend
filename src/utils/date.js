export const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const addDays = (date, days) => {
  const d = normalizeDate(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const formatDateOnly = (date) => {
  const d = normalizeDate(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getMinDueDate = () => formatDateOnly(addDays(new Date(), 7));
export const getMaxDueDate = () => formatDateOnly(addDays(new Date(), 40 * 7));
