import { getToday } from './getToday';
import { toLocale } from './toLocale';
import { UTC } from './UTC';

export const getWeekDays = (locale) => {
  const today = getToday();
  const weekdays = [];

  const date = UTC(new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))));
  Array.from(Array(7).keys()).forEach(() => {
    weekdays.push(toLocale(date, { locale: locale, weekday: 'short' }));
    date.setDate(date.getDate() + 1);
  });

  return weekdays;
};
