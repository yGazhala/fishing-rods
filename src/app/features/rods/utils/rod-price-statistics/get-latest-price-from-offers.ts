import { Offer } from '../../../../types/offer';
import { PriceByCurrency } from '../../types/price-by-currency';

export const getLatestPriceFromOffers = (
  offersInDescOrder: Offer[],
  isUsedRod: boolean,
): PriceByCurrency | undefined => {
  const offers = offersInDescOrder.filter((ad) => ad.isUsed === isUsedRod);
  const latestOffer = offers[0];

  if (latestOffer) {
    return {
      timestamp: latestOffer.timestamp,
      byCurrency: {
        UAH: latestOffer.priceUAH,
        USD: latestOffer.priceUSD,
      },
    };
  }
  return undefined;
};
