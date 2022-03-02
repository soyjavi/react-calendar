import { UTC } from './UTC';

export const getFirstDateOfMonth = (date) => UTC(new Date(date.getFullYear(), date.getMonth(), 1));
