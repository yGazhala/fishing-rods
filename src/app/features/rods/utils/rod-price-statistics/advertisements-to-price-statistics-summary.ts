import { Advertisement } from '../../../../types/advertisement';
import { getLatestPriceFromAdvertisements } from './get-latest-price-from-advertisements';
import { PriceStatisticsSummary } from '../../types/price-statistics-summary';

export const advertisementsToPriceStatisticsSummary = (
  advertisementsInDescOrder: Advertisement[],
): PriceStatisticsSummary => {
  return {
    latestPriceNew: getLatestPriceFromAdvertisements(advertisementsInDescOrder, false),
    latestPriceUsed: getLatestPriceFromAdvertisements(advertisementsInDescOrder, true),
  };
};
