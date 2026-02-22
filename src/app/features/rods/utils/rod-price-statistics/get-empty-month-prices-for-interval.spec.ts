import { getEmptyMonthPricesForInterval } from './get-empty-month-prices-for-interval';
import { PricesByMonth } from '../../types/prices-by-month';

describe('getEmptyMonthPricesForInterval', () => {
  it('should generate data for 1 month interval', () => {
    const year = 2026;
    const startTimestamp = new Date(year, 11, 1).getTime();
    const endTimestamp = new Date(year, 11, 31).getTime();

    const actualResult = getEmptyMonthPricesForInterval(startTimestamp, endTimestamp);

    const expectedResult: PricesByMonth[] = [
      {
        monthLabel: '12/2026',
        monthStartTimestamp: new Date(year, 11, 1).getTime(),
        newRodPrices: [],
        usedRodPrices: [],
        newRodAveragePrice: null,
        usedRodAveragePrice: null,
      },
    ];

    expect(actualResult).toEqual(expectedResult);
  });

  it('should generate data for 3 months interval', () => {
    const year = 2026;
    const startTimestamp = new Date(year, 0, 15).getTime(); // January 15
    const endTimestamp = new Date(year, 2, 10).getTime(); // March 10

    const actualResult = getEmptyMonthPricesForInterval(startTimestamp, endTimestamp);

    const expectedResult: PricesByMonth[] = [
      {
        monthLabel: '1/2026',
        monthStartTimestamp: new Date(year, 0, 1).getTime(),
        newRodPrices: [],
        usedRodPrices: [],
        newRodAveragePrice: null,
        usedRodAveragePrice: null,
      },
      {
        monthLabel: '2/2026',
        monthStartTimestamp: new Date(year, 1, 1).getTime(),
        newRodPrices: [],
        usedRodPrices: [],
        newRodAveragePrice: null,
        usedRodAveragePrice: null,
      },
      {
        monthLabel: '3/2026',
        monthStartTimestamp: new Date(year, 2, 1).getTime(),
        newRodPrices: [],
        usedRodPrices: [],
        newRodAveragePrice: null,
        usedRodAveragePrice: null,
      },
    ];

    expect(actualResult).toEqual(expectedResult);
  });
});
