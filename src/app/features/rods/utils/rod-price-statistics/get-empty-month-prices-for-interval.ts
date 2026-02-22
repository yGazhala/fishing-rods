import { eachMonthOfInterval } from 'date-fns';
import { PricesByMonth } from '../../types/prices-by-month';
import { timestampToMonthLabel } from './timestamp-to-month-label';

export const getEmptyMonthPricesForInterval = (
  startTimestamp: number,
  endTimestamp: number,
): PricesByMonth[] => {
  return eachMonthOfInterval({ start: startTimestamp, end: endTimestamp }).map((monthStart) => {
    const startTimestamp = monthStart.getTime();

    return {
      monthLabel: timestampToMonthLabel(startTimestamp),
      monthStartTimestamp: startTimestamp,
      newRodPrices: [],
      usedRodPrices: [],
      newRodAveragePrice: null,
      usedRodAveragePrice: null,
    };
  });
};
