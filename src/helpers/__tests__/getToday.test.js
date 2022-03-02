import { getToday } from '../getToday';

describe('@helpers/getToday', () => {
  test('alive', () => {
    expect(getToday).toBeDefined();
  });

  test('Naive use', () => {
    const date = new Date();
    const today = getToday();

    expect(today.getFullYear()).toEqual(date.getFullYear());
    expect(today.getMonth()).toEqual(date.getMonth());
    expect(today.getDate()).toEqual(date.getDate());

    // Avoid testing hours, minutes & seconds
    // expect(today.getHours()).not.toEqual(date.getHours());
    // expect(today.getMinutes()).not.toEqual(date.getMinutes());
    // expect(today.getSeconds()).not.toEqual(date.getSeconds());
  });
});
