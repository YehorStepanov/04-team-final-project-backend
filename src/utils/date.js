export const addMs = (date, ms) => new Date(date.getTime() + ms);

export const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatDateOnly = (date) => date.toLocaleDateString('en-CA');
