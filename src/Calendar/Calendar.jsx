import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getFirstDateOfMonth, getHeader, getToday, getWeekDays, getWeekNumber, UTC } from '../helpers';
import { Button, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS, VISIBLE_WEEKS } from './Calendar.definition';
import style from './Calendar.module.css';
import { Week } from './Calendar.Week';

export const Calendar = ({
  disabledDates = [],
  disabledPast = false,
  disabledToday = false,
  formatValue = 'YYYY/MM/DD',
  from,
  locale,
  to,
  value,
  onChange = () => {},
  ...others
}) => {
  const [instance, setInstance] = useState(getFirstDateOfMonth(getToday()));
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (!value) return;
    setInstance(getFirstDateOfMonth(new Date(value)));
    setSelected(UTC(new Date(value)));
  }, [value]);

  const handleChange = (date) => {
    setSelected(date);
    onChange(date);
  };

  const handleMonth = (month) =>
    setInstance(getFirstDateOfMonth(new Date(instance.getFullYear(), instance.getMonth() + month)));

  const instanceTS = instance.getTime();
  const todayMonthTS = getFirstDateOfMonth(getToday()).getTime();

  const disabledPrevious =
    (disabledPast && instanceTS <= todayMonthTS) ||
    (from && instanceTS <= getFirstDateOfMonth(new Date(from)).getTime());
  const disabledNext = to && instanceTS >= getFirstDateOfMonth(new Date(to)).getTime();

  const weekNumber = getWeekNumber(instance);
  const weekdays = getWeekDays(locale);

  return (
    <View {...others}>
      <View row>
        <Button disabled={disabledPrevious} onPress={() => handleMonth(-1)}>
          {'<'}
        </Button>
        <Text bold className={style.title} upperCase>
          {getHeader(instance, locale)}
        </Text>
        <Button disabled={disabledNext} onPress={() => handleMonth(1)}>
          {'>'}
        </Button>
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
          {...{ disabledDates, disabledPast, disabledToday, formatValue, from, to, selected }}
          key={week}
          month={instance.getMonth()}
          number={weekNumber + week}
          year={instance.getFullYear()}
          onPress={handleChange}
        />
      ))}
    </View>
  );
};

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  disabledToday: PropTypes.bool,
  formatValue: PropTypes.string,
  from: PropTypes.string,
  locale: PropTypes.string,
  to: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
