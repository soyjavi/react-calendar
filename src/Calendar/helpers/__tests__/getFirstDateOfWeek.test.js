import { getFirstDateOfWeek } from '../getFirstDateOfWeek';
import { DATE } from './calendar.test.config';

describe('atom:<Calendar>', () => {
  describe('helpers/getFirstDateOfWeek', () => {
    test('default', () => {
      const week = 15;
      const date = getFirstDateOfWeek(week, DATE.getFullYear());

      expect(date.getFullYear()).toEqual(1980);
      expect(date.getMonth()).toEqual(3);
      expect(date.getDate()).toEqual(7);
    });
  });
});
