import { Advertisement } from '../../../../types/advertisement';
import { CurrencyCode } from '../../../../types/currency-code';
import { PricesByMonth } from '../../types/prices-by-month';
import { getEmptyMonthPricesForInterval } from './get-empty-month-prices-for-interval';
import { timestampToMonthLabel } from './timestamp-to-month-label';
import { calculateAverage } from './calculate-average';

export const advertisementsToMonthPrices = (
  advertisementsInDescOrder: Advertisement[],
  currency: CurrencyCode,
): PricesByMonth[] => {
  if (!advertisementsInDescOrder.length) {
    return [];
  }

  const newestAd = advertisementsInDescOrder[0];
  const oldestAd = advertisementsInDescOrder.at(-1) as Advertisement;

  const monthsInAscOrder = getEmptyMonthPricesForInterval(oldestAd.timestamp, newestAd.timestamp);

  const pricesByMonthMap: { [monthLabel: string]: PricesByMonth } = {};
  // Copy references to months in an object for fast access
  monthsInAscOrder.forEach((month) => {
    pricesByMonthMap[month.monthLabel] = month;
  });

  // Fill prices for each month
  const priceKey = currency === 'UAH' ? 'priceUAH' : 'priceUSD';
  advertisementsInDescOrder.forEach((ad) => {
    const monthLabel = timestampToMonthLabel(ad.timestamp);
    const price = ad[priceKey];
    if (ad.isUsed) {
      pricesByMonthMap[monthLabel].usedRodPrices.push(price);
    } else {
      pricesByMonthMap[monthLabel].newRodPrices.push(price);
    }
  });

  monthsInAscOrder.forEach((month) => {
    month.newRodAveragePrice = calculateAverage(month.newRodPrices);
    month.usedRodAveragePrice = calculateAverage(month.usedRodPrices);
  });

  return monthsInAscOrder;
};
