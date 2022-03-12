import { dateFormat, UTC } from '@soyjavi/locale';
import PropTypes from 'prop-types';
import React from 'react';

import { Button as Touchable, Text, View } from '../primitives';
import { styles } from '../primitives/helpers';
import { DAYS } from './Calendar.definition';
import style from './Calendar.module.css';
import { getFirstDateOfWeek, getToday } from './helpers';

export const Week = ({
  captions,
  disabledDates = [],
  disabledPast = false,
  dateFocus,
  locale,
  formatValue,
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
  if (range) {
    const [start, end] = selected;
    rangeTS = { start: start ? start.getTime() : undefined, end: end ? end.getTime() : undefined };

    if (dateFocus) {
      const dateFocusTS = dateFocus.getTime();
      const [outbound] = disabledDatesTS.filter((ts) => ts > rangeTS.start && dateFocusTS >= ts).sort();

      rangeTS.end = outbound ? outbound - 1 : dateFocusTS;
      rangeTS.outbound = outbound - 1;
    }
  }

  return (
    <View row>
      {DAYS.map((day) => {
        const date = UTC(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + day));
        const dateTS = date.getTime();

        const is = {
          disabled:
            (disabledPast && date.getTime() < todayTS) || // past
            !date.getMonth() === month || // days out of month
            disabledDatesTS.includes(dateTS) || // disabled dates
            dateTS < fromTS || // less than range
            dateTS > toTS, // more than range
          outOfRange: dateTS > rangeTS.outbound,
          range: dateTS > rangeTS.start && dateTS < rangeTS.end,
          rangeLimit: dateTS === rangeTS.start || dateTS === rangeTS.end,
          // ranged:
          ranging: range && selected?.[0] && !selected[1],
          today: dateTS === todayTS,
          touchable: true,
          visible: date.getMonth() === month,
        };

        const isSelected =
          range && selected
            ? selected[0] && !selected[1]
              ? dateTS === selected[0].getTime()
              : selected[0] && selected[1]
              ? dateTS >= selected[0].getTime() && dateTS <= selected[1].getTime()
              : undefined
            : dateTS === selected?.getTime();

        const textStyle = is.disabled
          ? style.textDisabled
          : isSelected || dateTS === rangeTS.end
          ? style.textSelected
          : undefined;

        return (
          <Touchable
            disabled={is.disabled || is.outOfRange || !is.visible}
            key={day}
            tabIndex={is.visible && !is.disabled ? date.getDate() : undefined}
            testID={`${others.testID}-${day}`}
            className={style.cell}
            onEnter={is.ranging ? () => onFocus(date) : undefined}
            onLeave={is.ranging ? () => onFocus() : undefined}
            onPress={() => onPress(date)}
          >
            {is.visible && (
              <View
                className={styles(
                  style.day,
                  isSelected && style.daySelected,
                  is.range && style.dayRange,
                  is.rangeLimit && style.dayRangeLimit,
                  !isSelected && !is.disabled && isSelected && style.dayTouchable,
                )}
              >
                <Text bold={is.today} className={textStyle}>
                  {dateFormat(date, { locale, day: 'numeric' })}
                </Text>

                {captions && (
                  <Text small className={styles(textStyle, style.caption)}>
                    {captions[dateFormat(date, { format: formatValue })] || ''}
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
  dateFocus: PropTypes.object,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  locale: PropTypes.string,
  formatValue: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  range: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  onFocus: PropTypes.func,
  onPress: PropTypes.func,
};
