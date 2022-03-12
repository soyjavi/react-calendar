import { getWeekNumber } from '../getWeekNumber';
import { DATE } from './calendar.test.config';

describe('atom:<Calendar>', () => {
  describe('helpers/getWeekNumber', () => {
    test('default', () => {
      expect(getWeekNumber(DATE)).toEqual(15);
    });
  });
});
