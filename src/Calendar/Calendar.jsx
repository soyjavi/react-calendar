import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getFirstDateOfMonth, getHeader, getToday, getWeekDays, getWeekNumber, UTC } from '../helpers';
import { Button, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS, VISIBLE_WEEKS } from './Calendar.definition';
import style from './Calendar.module.css';
import { Week } from './Calendar.Week';

export const Calendar = ({
  disabledPast = false,
  formatValue = 'YYYY/MM/DD',
  from,
  locale,
  range = false,
  to,
  value,
  onChange = () => {},
  ...others
}) => {
  const [instance, setInstance] = useState(getFirstDateOfMonth(getToday()));
  const [selected, setSelected] = useState(undefined);
  const [dateFocus, setDateFocus] = useState();

  useEffect(() => {
    const date = range ? (value ? value[0] : undefined) : value;
    if (!date) return;

    setInstance(getFirstDateOfMonth(new Date(date)));
    setSelected(range ? [UTC(new Date(date)), value[1] ? UTC(new Date(value[1])) : undefined] : UTC(new Date(date)));
  }, [range, value]);

  const handleChange = (date) => {
    let next;

    if (!range) {
      next = date;
      onChange(next);
    } else {
      if (selected === undefined || selected.length === 0) next = [date];
      else if (selected[1] === undefined) {
        if (date > selected[0]) {
          next = [selected[0], date];
          onChange(next);
        } else {
          next = [date];
          // TODO: Alert
          setDateFocus(undefined);
        }
      } else next = [date];
    }
    setSelected(next);
  };

  const handleMonth = (month) => {
    setInstance(getFirstDateOfMonth(new Date(instance.getFullYear(), instance.getMonth() + month)));
  };

  const instanceTS = instance.getTime();
  const todayMonthTS = getFirstDateOfMonth(getToday()).getTime();

  const disabledPrevious =
    (disabledPast && instanceTS <= todayMonthTS) ||
    (from && instanceTS <= getFirstDateOfMonth(new Date(from)).getTime());
  const disabledNext = to && instanceTS >= getFirstDateOfMonth(new Date(to)).getTime();

  const weekNumber = getWeekNumber(instance);
  const weekdays = getWeekDays(locale);

  return (
    <View className={styles(style.calendar, others.style)}>
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
          {...{
            ...others,
            disabledPast,
            dateFocus,
            formatValue,
            from,
            to,
            range,
            selected,
          }}
          key={week}
          month={instance.getMonth()}
          number={weekNumber + week}
          year={instance.getFullYear()}
          onFocus={setDateFocus}
          onPress={handleChange}
        />
      ))}
    </View>
  );
};

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
  captions: PropTypes.shape({}),
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
};
