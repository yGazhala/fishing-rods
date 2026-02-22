import { PriceStatisticsSummary } from '../../types/price-statistics-summary';
import { CurrencyCode } from '../../../../types/currency-code';
import { Price } from '../../types/price';

export const getLatestPriceFromStatisticsSummary = (
  summary: PriceStatisticsSummary,
  currency: CurrencyCode,
  isUsedRod: boolean,
): Price | undefined => {
  const latestPrice = isUsedRod ? summary.latestPriceUsed : summary.latestPriceNew;
  if (latestPrice) {
    const value = latestPrice.byCurrency[currency] as number;
    return {
      value,
      currencyCode: currency,
      timestamp: latestPrice.timestamp,
    };
  }
  return undefined;
};
