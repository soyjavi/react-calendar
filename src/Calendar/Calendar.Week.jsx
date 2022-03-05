import PropTypes from 'prop-types';
import React from 'react';

import { getFirstDateOfWeek, getToday, toLocale, UTC } from '../helpers';
import { Button as Touchable, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS } from './Calendar.definition';
import style from './Calendar.module.css';
import { dateToISOString } from './helpers';

export const Week = ({
  captions,
  disabledDates = [],
  disabledPast = false,
  dateFocus,
  from,
  month,
  number,
  range,
  selected,
  to,
  year,
  onPress = () => {},
  onFocus = () => {},
  ...others
}) => {
  const disabledDatesTS = disabledDates.map((date) => UTC(new Date(date)).getTime()).filter((date) => !isNaN(date));
  const firstDate = getFirstDateOfWeek(number, year);
  const todayTS = getToday().getTime();
  const fromTS = from ? UTC(new Date(from)).getTime() : undefined;
  const toTS = to ? UTC(new Date(to)).getTime() : undefined;

  let rangeTS = {};
  if (dateFocus) {
    const dateFocusTS = dateFocus.getTime();
    rangeTS = { start: selected[0].getTime(), end: dateFocusTS };

    const [outbound] = disabledDatesTS.filter((ts) => ts > rangeTS.start && dateFocus >= ts).sort();
    rangeTS.end = outbound ? outbound - 1 : dateFocusTS;
  }

  return (
    <View row>
      {DAYS.map((day) => {
        const date = UTC(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + day));
        const dateTS = date.getTime();

        const is = {
          disabled:
            (disabledPast && date.getTime() < todayTS) || // Past
            !date.getMonth() === month || // Days out of month
            disabledDatesTS.includes(dateTS) || // disabled dates
            dateTS < fromTS || // ?
            dateTS > toTS, // ?
          visible: date.getMonth() === month,
          today: dateTS === todayTS,
        };

        const isSelected =
          range && selected
            ? selected[0] && !selected[1]
              ? dateTS === selected[0].getTime()
              : selected[0] && selected[1]
              ? dateTS >= selected[0].getTime() && dateTS <= selected[1].getTime()
              : undefined
            : selected && dateTS === selected.getTime();

        const isInRange = dateTS > rangeTS.start && dateTS < rangeTS.end;
        const isTouchable =
          // is.visible && !is.disabled && (!range || (range && !dateFocus) || (range && dateFocus && isInRange));
          !is.disabled;

        const isCreatingRange = range && selected?.[0] && !selected[1];

        const textStyle = is.disabled
          ? style.textDisabled
          : isSelected || dateTS === rangeTS.end
          ? style.textSelected
          : undefined;

        const caption = captions ? captions[dateToISOString(date)] : undefined;

        return (
          <Touchable
            disabled={is.disabled || !is.visible}
            testID={`${others.testID}-${day}`}
            key={day}
            tabIndex={is.visible && !is.disabled ? date.getDate() : undefined}
            className={style.cell}
            onEnter={isCreatingRange ? () => onFocus(date) : undefined}
            onLeave={isCreatingRange ? () => onFocus() : undefined}
            onPress={() => onPress(date)}
          >
            {is.visible && (
              <View
                className={styles(
                  style.cellDay,
                  isSelected && style.cellDaySelected,
                  isInRange && style.cellDayRange,
                  (dateTS === rangeTS.start || dateTS === rangeTS.end) && style.cellDayRangeLimits,
                  !isSelected && isTouchable && style.cellTouchable,
                )}
              >
                <Text bold={is.today} className={textStyle}>
                  {toLocale(date, { day: 'numeric' })}
                </Text>

                {captions && (
                  <Text small className={styles(textStyle, style.caption)}>
                    {caption || ''}
                  </Text>
                )}
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
  captions: PropTypes.shape({}),
  dateFocus: PropTypes.date,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  range: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onFocus: PropTypes.func,
  onPress: PropTypes.func,
};
