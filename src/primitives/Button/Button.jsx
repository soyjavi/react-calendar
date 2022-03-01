import PropTypes from 'prop-types';
import React from 'react';

import { styles } from '../helpers';
import style from './Button.module.css';

const Button = ({ children, disabled, tag = 'button', onPress, ...inherit }) =>
  React.createElement(
    tag,
    {
      className: styles(style.primitive, inherit.className),
      onClick: !disabled ? onPress : undefined,
    },
    children,
  );

Button.displayName = 'Primitive:Button';

Button.propTypes = {
  children: PropTypes.oneOf([PropTypes.string, PropTypes.node, PropTypes.element]),
  disabled: PropTypes.bool,
  tag: PropTypes.string,
  onPress: PropTypes.func,
};

export { Button };
