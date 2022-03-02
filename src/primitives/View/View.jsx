import PropTypes from 'prop-types';
import React from 'react';

import { styles } from '../helpers';
import style from './View.module.css';

const View = ({ children, row, tag = 'div', ...inherit }) =>
  React.createElement(
    tag,
    {
      className: styles(style.primitive, row && style.row, inherit.className),
    },
    children,
  );

View.displayName = 'Primitive:View';

View.propTypes = {
  children: PropTypes.PropTypes.node,
  row: PropTypes.bool,
  tag: PropTypes.string,
};

export { View };
