import { Offer } from '../../../../types/offer';
import { PriceLineChartDataByCurrency } from '../../types/price-line-chart-data-by-currency';
import { CurrencyCode } from '../../../../types/currency-code';
import { offersToPriceLineChartData } from './offers-to-price-line-chart-data';

export const offersToPriceLineChartDataByCurrency = (
  offersInDescOrder: Offer[],
): PriceLineChartDataByCurrency => {
  const result: PriceLineChartDataByCurrency = {};
  const currencyCodes: CurrencyCode[] = ['UAH', 'USD'];
  currencyCodes.forEach((currency) => {
    result[currency] = offersToPriceLineChartData(offersInDescOrder, currency);
  });

  return result;
};
