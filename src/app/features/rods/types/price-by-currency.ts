import { CurrencyCode } from '../../../types/currency-code';

export type PriceByCurrency = {
  byCurrency: {
    [key in CurrencyCode]?: number;
  };
  timestamp?: number;
};
