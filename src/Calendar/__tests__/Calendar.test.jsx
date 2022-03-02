import { render } from '@soyjavi/testing-react';
import { DATE } from 'helpers/__tests__/calendar.test.config';
import { UTC } from 'helpers/UTC';
import React from 'react';

// import { hookStyler } from '@mocks';
// import { DATE } from '../../helpers/__tests__/calendar.test.config';
import { Calendar } from '../Calendar';

const toString = (date) => date.toISOString().substr(0, 10);

const from = toString(UTC(new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate() - 1)));
const to = toString(UTC(new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate() + 1)));
const disabledDates = [from, to];
const locale = 'en-EN';

const DEFAULTS = {
  value: toString(UTC(DATE)),
};

describe('molecule:<Calendar>', () => {
  beforeAll(() => {
    jest.spyOn(String, 'fromCharCode').mockImplementation((charCode) => charCode);
  });

  test('renders', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:disabledDates', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} disabledDates={disabledDates} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:disabledPast', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} disabledPast />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:disabledToday', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} disabledToday />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:from', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} from={from} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:to', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} to={to} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:locale', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} locale={locale} />);
    expect(toJSON()).toMatchSnapshot();
  });

  // test('prop:onChange', () => {
  //   const handleChange = jest.fn();

  //   const { getAllByTestId } = render(<Calendar {...DEFAULTS} onChange={handleChange} testID="jest" />);
  //   const [el] = getAllByTestId(`jest-1`);
  //   fireEvent.press(el);

  //   expect(handleChange).toHaveBeenCalledTimes(1);
  // });

  // Testing
  // test('testID', () => {
  //   const { toJSON, getByTestId } = render(<Calendar {...DEFAULTS} data-testID="reactor" />);
  //   expect(getByTestId('reactor')).toBeDefined();
  //   expect(toJSON()).toMatchSnapshot();
  // });

  // Styling
  test('inherit:className', () => {
    const { toJSON } = render(<Calendar {...DEFAULTS} className="reactor" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
