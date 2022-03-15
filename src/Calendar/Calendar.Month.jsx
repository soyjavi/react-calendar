import PropTypes from 'prop-types';
import React from 'react';

import { Button, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS, VISIBLE_WEEKS } from './Calendar.definition';
import style from './Calendar.module.css';
import { Week } from './Calendar.Week';
import { getHeader, getWeekDays, getWeekNumber } from './helpers';

export const Month = ({
  dateFocus,
  instance,
  selected,
  disabledPast = true,
  formatValue = 'YYYY/MM/DD',
  from,
  locale,
  range = false,
  to,
  // value,
  onChange = () => {},
  onFocus = () => {},
  onNext,
  onPrevious,
  ...others
}) => {
  const weekNumber = getWeekNumber(instance);
  const weekdays = getWeekDays(locale);

  return (
    <View className={styles(style.calendar, others.style)}>
      <View row>
        {onPrevious && <Button onPress={onPrevious}>{'←'}</Button>}
        <Text bold upperCase className={style.title}>
          {getHeader(instance, locale)}
        </Text>
        {onNext && <Button onPress={onNext}>{'→'}</Button>}
      </View>

      <View row className={style.weekdays}>
        {DAYS.map((day) => (
          <Text small key={day} upperCase className={styles(style.cell, style.weekday)}>
            {weekdays[day]}
          </Text>
        ))}
      </View>

      {VISIBLE_WEEKS.map((week) => (
        <Week
          {...{
            ...others,
            disabledPast,
            dateFocus,
            formatValue,
            from,
            locale,
            to,
            range,
            selected,
          }}
          key={week}
          month={instance.getMonth()}
          number={weekNumber + week}
          year={instance.getFullYear()}
          onFocus={onFocus}
          onPress={onChange}
        />
      ))}
    </View>
  );
};

Month.displayName = 'Month';

Month.propTypes = {
  captions: PropTypes.shape({}),
  dateFocus: PropTypes.any,
  instance: PropTypes.any,
  selected: PropTypes.any,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  disabledWeekends: PropTypes.bool,
  formatValue: PropTypes.string,
  from: PropTypes.string,
  locale: PropTypes.string,
  range: PropTypes.bool,
  to: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
};
