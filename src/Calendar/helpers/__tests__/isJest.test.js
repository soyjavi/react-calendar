import { IS_JEST } from '../isJest';

describe('@helpers/isJest', () => {
  test('alive', () => {
    expect(IS_JEST).toBeDefined();
  });

  test('Naive use', () => {
    expect(IS_JEST).toEqual(false);
  });
});
