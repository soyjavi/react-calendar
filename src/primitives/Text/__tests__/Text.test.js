import { render } from '@soyjavi/testing-react';
import React from 'react';

import { Text } from '../Text';

const DEFAULTS = {
  children: 'Lorem Ipsum',
};

describe('primitive:<Text>', () => {
  test('renders', () => {
    const { toJSON } = render(<Text {...DEFAULTS} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:action', () => {
    const { toJSON } = render(<Text {...DEFAULTS} action />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:bold', () => {
    const { toJSON } = render(<Text {...DEFAULTS} bold />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:headline', () => {
    const { toJSON } = render(<Text {...DEFAULTS} headline />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:upperCase', () => {
    const { toJSON } = render(<Text {...DEFAULTS} upperCase />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:small', () => {
    const { toJSON } = render(<Text {...DEFAULTS} small />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('prop:h1', () => {
    const { toJSON } = render(<Text {...DEFAULTS} tag="h1" />);
    expect(toJSON()).toMatchSnapshot();
  });

  // Testing
  test('testID', () => {
    const { toJSON } = render(<Text {...DEFAULTS} data-testID="reactor" />);
    // expect(getByTestId('reactor')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  // Styling
  test('inherit:className', () => {
    const { toJSON } = render(<Text {...DEFAULTS} className="reactor" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
