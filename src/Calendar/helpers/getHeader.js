import { dateFormat } from '@soyjavi/locale';

export const getHeader = (date, locale) => {
  const month = dateFormat(date, { locale, month: 'long' });
  const year = dateFormat(date, { locale, year: 'numeric' });

  return `${month} ${year}`;
};
