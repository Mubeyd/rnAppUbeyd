import moment, { Moment } from 'moment';
import { WeekendsType } from '../db/types';

export function calculateWorkdays({
  startDate,
  endDate,
  weekendsType,
  holiDays,
}: {
  startDate: Moment;
  endDate: Moment;
  weekendsType: WeekendsType;
  holiDays: string[];
}) {
  const start = moment(startDate);
  const end = moment(endDate);
  let workdays = 0;

  for (let currentDay = start; currentDay.isSameOrBefore(end, 'day'); currentDay.add(1, 'day')) {
    if (weekendsType === WeekendsType.Type2) {
      if (isNotFridayANDSaturday(currentDay) && isNotHoliDay(currentDay, holiDays)) {
        workdays++;
      }
      continue;
    }
    if (isNotSaturdayANDSunday(currentDay) && isNotHoliDay(currentDay, holiDays)) {
      workdays++;
    }
  }

  return workdays;
}

const isNotSaturdayANDSunday = (currentDay: Moment) => {
  return currentDay.isoWeekday() !== 6 && currentDay.isoWeekday() !== 7;
};

const isNotFridayANDSaturday = (currentDay: Moment) => {
  return currentDay.isoWeekday() !== 5 && currentDay.isoWeekday() !== 6;
};

const isNotHoliDay = (currentDay: Moment, holiDays: string[]) => {
  return !holiDays.includes(currentDay.format('MM/DD'));
};
