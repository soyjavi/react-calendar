import { toLocale } from '../toLocale';
import { DATE } from './calendar.test.config';

describe('@helpers/toLocale', () => {
  test('alive', () => {
    expect(toLocale).toBeDefined();
  });

  test('Naive use', () => {
    expect(toLocale(DATE, {})).toEqual('4/10/1980');
  });

  xtest('w/ locale', () => {
    expect(toLocale(DATE, { locale: 'es-ES' })).toEqual('10/4/1980');
  });

  test('w/ year', () => {
    expect(toLocale(DATE, { year: 'numeric' })).toEqual('1980');
  });

  test('w/ month', () => {
    expect(toLocale(DATE, { month: 'short' })).toEqual('Apr');
    expect(toLocale(DATE, { month: 'long' })).toEqual('April');
    expect(toLocale(DATE, { month: 'numeric' })).toEqual('4');
  });

  test('w/ day', () => {
    expect(toLocale(DATE, { day: 'numeric' })).toEqual('10');
  });

  test('w/ weekday', () => {
    expect(toLocale(DATE, { weekday: 'short' })).toEqual('Thu');
    expect(toLocale(DATE, { weekday: 'long' })).toEqual('Thursday');
  });
});
