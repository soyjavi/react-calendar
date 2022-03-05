export const dateToISOString = (date = new Date()) => date.toISOString().substring(0, 10).split('-').join('/');
