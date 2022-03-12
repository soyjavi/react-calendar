import { UTC } from '@soyjavi/locale';

export const getFirstDateOfMonth = (date = new Date()) => UTC(new Date(date.getFullYear(), date.getMonth(), 1));
