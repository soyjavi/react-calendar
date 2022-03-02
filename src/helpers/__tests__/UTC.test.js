import { UTC } from '../UTC';
import { DATE } from './calendar.test.config';

describe('@helpers/UTC', () => {
  test('alive', () => {
    expect(UTC).toBeDefined();
  });

  test('Naive use', () => {
    expect(DATE.getHours()).not.toEqual(0);
    expect(DATE.getMinutes()).not.toEqual(0);
    expect(DATE.getSeconds()).not.toEqual(0);

    const date = UTC(DATE);
    expect(date.getUTCHours()).toEqual(0);
    // Avoid testing minutes & seconds
    // expect(date.getMinutes()).toEqual(0);
    // expect(date.getSeconds()).toEqual(0);
  });
});
