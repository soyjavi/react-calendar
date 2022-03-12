import { dateFormat, UTC } from '@soyjavi/locale';

import { getToday } from './getToday';

export const getWeekDays = (locale) => {
  const today = getToday();
  const weekdays = [];

  const date = UTC(new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))));
  Array.from(Array(7).keys()).forEach(() => {
    weekdays.push(dateFormat(date, { locale, weekday: 'short' }));
    date.setDate(date.getDate() + 1);
  });

  return weekdays;
};
