import PropTypes from 'prop-types';
import React from 'react';

import { styles } from '../helpers';
import style from './Button.module.css';

const Button = ({ children, disabled, tag = 'button', onEnter, onLeave, onPress, ...others }) =>
  React.createElement(
    tag,
    {
      className: styles(style.primitive, !disabled && style.active, others.className),
      onClick: !disabled ? onPress : undefined,
      onMouseEnter: onEnter,
      onMouseLeave: onLeave,
    },
    children,
  );

Button.displayName = 'Primitive:Button';

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  tag: PropTypes.string,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  onPress: PropTypes.func,
};

export { Button };
