import { IS_JEST } from './isJest';

const DEFAULT_LOCALE = IS_JEST ? 'en-EN' : undefined;

export const toLocale = (date, { locale = DEFAULT_LOCALE, ...options } = {}) =>
  date.toLocaleDateString(locale, options);
