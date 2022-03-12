import { UTC } from '@soyjavi/locale';

export const getWeekNumber = (date) => {
  const firstDayOfYear = UTC(new Date(date.getFullYear(), 0, 1));
  const pastDaysOfYear = (Number(date) - Number(firstDayOfYear)) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
};
