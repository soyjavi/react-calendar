import PropTypes from 'prop-types';
import React from 'react';

import { styles } from '../helpers';
import style from './Text.module.css';

const Text = ({ action, bold, children, headline, small, tag = 'span', upperCase, ...inherit }) =>
  React.createElement(
    tag,
    {
      className: styles(
        style.primitive,
        bold && style.bold,
        headline ? style.headline : action ? style.action : small ? style.small : style.paragraph,
        upperCase && style.upperCase,
        inherit.className,
      ),
    },
    children,
  );

Text.displayName = 'Primitive:Text';

Text.propTypes = {
  action: PropTypes.bool,
  bold: PropTypes.bool,
  children: PropTypes.string,
  headline: PropTypes.bool,
  upperCase: PropTypes.bool,
  small: PropTypes.bool,
  tag: PropTypes.string,
};

export { Text };
