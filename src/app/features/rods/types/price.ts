import { CurrencyCode } from '../../../types/currency-code';

export type Price = {
  value: number;
  currencyCode: CurrencyCode;
  timestamp?: number;
};
