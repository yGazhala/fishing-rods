import { Advertisement } from '../../../../types/advertisement';
import { PriceLineChartDataByCurrency } from '../../types/price-line-chart-data-by-currency';
import { CurrencyCode } from '../../../../types/currency-code';
import { advertisementsToPriceLineChartData } from './advertisements-to-price-line-chart-data';

export const advertisementsToPriceLineChartDataByCurrency = (
  advertisementsInDescOrder: Advertisement[],
): PriceLineChartDataByCurrency => {
  const result: PriceLineChartDataByCurrency = {};
  const currencyCodes: CurrencyCode[] = ['UAH', 'USD'];
  currencyCodes.forEach((currency) => {
    result[currency] = advertisementsToPriceLineChartData(advertisementsInDescOrder, currency);
  });

  return result;
};
