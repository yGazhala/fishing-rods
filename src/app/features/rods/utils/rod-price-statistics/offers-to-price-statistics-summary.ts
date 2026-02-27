import { Offer } from '../../../../types/offer';
import { getLatestPriceFromOffers } from './get-latest-price-from-offers';
import { PriceStatisticsSummary } from '../../types/price-statistics-summary';

export const offersToPriceStatisticsSummary = (
  offersInDescOrder: Offer[],
): PriceStatisticsSummary => {
  return {
    latestPriceNew: getLatestPriceFromOffers(offersInDescOrder, false),
    latestPriceUsed: getLatestPriceFromOffers(offersInDescOrder, true),
  };
};
