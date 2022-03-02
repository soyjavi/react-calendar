import { capitalize } from './capitalize';
import { toLocale } from './toLocale';

export const getHeader = (date, locale) => {
  const month = capitalize(toLocale(date, { locale: locale, month: 'long' }));
  const year = toLocale(date, { locale: locale, year: 'numeric' });

  return `${capitalize(month)} ${year}`;
};
