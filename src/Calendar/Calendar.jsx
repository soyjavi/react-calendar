import { parseDate, UTC } from '@soyjavi/locale';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useDevice } from '../hooks';
import { View } from '../primitives';
import { Month } from './Calendar.Month';
import { getFirstDateOfMonth, getToday } from './helpers';

export const Calendar = ({
  disabledPast = true,
  formatValue = 'YYYY/MM/DD',
  from,
  months = 2,
  locale,
  range = false,
  to,
  value,
  onChange = () => {},
  ...others
}) => {
  const { isDesktop } = useDevice();

  const [instance, setInstance] = useState(getFirstDateOfMonth(getToday()));
  const [selected, setSelected] = useState(range ? [] : undefined);
  const [dateFocus, setDateFocus] = useState();

  useEffect(() => {
    let date = range ? (value ? value[0] : undefined) : value;
    if (!date) return;

    date = parseDate(date, formatValue);
    setInstance(getFirstDateOfMonth(date));
    setSelected(range ? [UTC(date), value[1] ? UTC(parseDate(value[1], formatValue)) : undefined] : UTC(date));
  }, [formatValue, range, value]);

  const handleChange = (date) => {
    setSelected(() => {
      let next;

      if (!range) {
        next = date;
        onChange(next);
      } else if (selected[1] === undefined && date > selected[0]) {
        next = [selected[0], date];
        onChange(next);
      } else {
        next = [date];
      }

      return next;
    });
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

  const props = {
    ...others,
    dateFocus,
    locale,
    range,
    selected,
    onChange: handleChange,
    onFocus: setDateFocus,
  };

  return (
    <View row={isDesktop}>
      {Array.from({ length: months }, (empty, index) => (
        <Month
          onNext={isDesktop && index === months - 1 && !disabledNext ? () => handleMonth(months) : undefined}
          onPrevious={isDesktop && index === 0 && !disabledPrevious ? () => handleMonth(-months) : undefined}
          instance={new Date(instance.getFullYear(), instance.getMonth() + index, 1)}
          {...props}
        />
      ))}
    </View>
  );
};

Calendar.propTypes = {
  captions: PropTypes.shape({}),
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledPast: PropTypes.bool,
  disabledWeekends: PropTypes.bool,
  formatValue: PropTypes.string,
  from: PropTypes.string,
  locale: PropTypes.string,
  months: PropTypes.number,
  range: PropTypes.bool,
  to: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onChange: PropTypes.func,
};
