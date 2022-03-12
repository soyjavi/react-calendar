import { getFirstDateOfMonth } from '../getFirstDateOfMonth';
import { DATE } from './calendar.test.config';

describe('atom:<Calendar>', () => {
  describe('helpers/getFirstDateOfMonth', () => {
    test('default', () => {
      expect(DATE.getFullYear()).toEqual(1980);
      expect(DATE.getMonth()).toEqual(3);
      expect(DATE.getDate()).toEqual(10);

      const date = getFirstDateOfMonth(DATE);
      expect(date.getFullYear()).toEqual(1980);
      expect(date.getMonth()).toEqual(3);
      expect(date.getDate()).toEqual(1);
    });
  });
});
