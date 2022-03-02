import { capitalize } from '../capitalize';

describe('@helpers/capitalize', () => {
  test('alive', () => {
    expect(capitalize).toBeDefined();
  });

  test('Naive use', () => {
    expect(capitalize('')).toEqual('');
    expect(capitalize('c')).toEqual('C');
    expect(capitalize('capitalize')).toEqual('Capitalize');
  });
});
