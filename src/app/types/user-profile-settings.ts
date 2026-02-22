import { CurrencyCode } from './currency-code';

export type UserProfileSettings = {
  userId: string;
  defaultCurrency: CurrencyCode;
};
