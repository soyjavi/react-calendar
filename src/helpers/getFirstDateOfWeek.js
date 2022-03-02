import { UTC } from './UTC';

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

export const getFirstDateOfWeek = (week, year) => {
  const date = UTC(new Date(year, 0, 1, 0));
  const offsetTimeStart = DAY_MS * (date.getDay() - 1);

  return UTC(new Date(date.getTime() + WEEK_MS * (week - 1) - offsetTimeStart));
};
