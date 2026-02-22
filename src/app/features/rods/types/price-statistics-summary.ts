import { PriceByCurrency } from './price-by-currency';

export type PriceStatisticsSummary = {
  latestPriceNew?: PriceByCurrency;
  latestPriceUsed?: PriceByCurrency;
};
