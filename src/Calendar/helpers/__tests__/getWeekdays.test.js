import { getWeekDays } from '../getWeekDays';

describe('atom:<Calendar>', () => {
  describe('helpers/getWeekDays', () => {
    test('default', () => {
      expect(getWeekDays()).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    });

    xtest('w/ locale', () => {
      expect(getWeekDays('es-ES')).toEqual(['L', 'M', 'M', 'J', 'V', 'S', 'D']);
    });
  });
});
