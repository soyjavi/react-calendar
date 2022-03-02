import PropTypes from 'prop-types';
import React from 'react';

import { getFirstDateOfWeek, getToday, toLocale, UTC } from '../helpers';
import { Button as Touchable, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS } from './Calendar.definition';
import style from './Calendar.module.css';

export const Week = ({
  disabledDates = [],
  disabledPast = false,
  disabledToday = false,
  from,
  to,
  month,
  number,
  year,
  onPress,
  selected,
  ...others
}) => {
  const disabledDatesTS = disabledDates.map((date) => UTC(new Date(date)).getTime()).filter((date) => !isNaN(date));
  const firstDate = getFirstDateOfWeek(number, year);
  const todayTS = getToday().getTime();
  const fromTS = from ? UTC(new Date(from)).getTime() : undefined;
  const toTS = to ? UTC(new Date(to)).getTime() : undefined;

  return (
    <View row>
      {DAYS.map((day) => {
        const date = UTC(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + day));
        const dateTS = date.getTime();

        const isPast = disabledPast && date.getTime() < todayTS;
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isDisabled =
          isPast ||
          isWeekend ||
          disabledDatesTS.includes(dateTS) ||
          (disabledToday && dateTS === todayTS) ||
          dateTS < fromTS ||
          dateTS > toTS;
        const isSelected = selected && dateTS === selected.getTime();
        const isVisible = date.getMonth() === month;
        const isTouchable = !isSelected && !isDisabled;
        const isToday = dateTS === todayTS;

        return (
          <Touchable
            testID={`${others.testID}-${day}`}
            key={day}
            tabIndex={!isDisabled ? date.getDate() : undefined}
            className={style.cellTouchable}
            onPress={isVisible && !isDisabled && !isSelected ? () => onPress(date) : undefined}
          >
            {isVisible && (
              <View
                className={styles(
                  style.cellDay,
                  isSelected && style.cellDaySelected,
                  isTouchable && style.focus,
                  isToday && (isDisabled ? style.todayDisabled : style.today),
                )}
              >
                <Text
                  bold={isToday}
                  className={styles(isDisabled && style.textDisabled, isSelected && style.textSelected)}
                >
                  {toLocale(date, { day: 'numeric' })}
                </Text>
              </View>
            )}
          </Touchable>
        );
      })}
    </View>
  );
};

Week.displayName = 'Week';

Week.propTypes = {
  color: PropTypes.string,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  disabledToday: PropTypes.bool,
  from: PropTypes.string,
  month: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  selected: PropTypes.any,
  to: PropTypes.string,
  year: PropTypes.number.isRequired,
};
