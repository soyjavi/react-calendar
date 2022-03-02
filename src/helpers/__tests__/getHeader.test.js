import { getHeader } from '../getHeader';
import { DATE } from './calendar.test.config';

describe('atom:<Calendar>', () => {
  describe('helpers/getHeader', () => {
    test('default', () => {
      expect(getHeader(DATE)).toEqual('April 1980');
    });

    xtest('w/ locale', () => {
      expect(getHeader(DATE, 'es-ES')).toEqual('Abril 1980');
    });
  });
});
