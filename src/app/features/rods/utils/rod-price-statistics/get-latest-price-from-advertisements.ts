import { Advertisement } from '../../../../types/advertisement';
import { PriceByCurrency } from '../../types/price-by-currency';

export const getLatestPriceFromAdvertisements = (
  advertisementsInDescOrder: Advertisement[],
  isUsedRod: boolean,
): PriceByCurrency | undefined => {
  const ads = advertisementsInDescOrder.filter((ad) => ad.isUsed === isUsedRod);
  const latestAd = ads[0];

  if (latestAd) {
    return {
      timestamp: latestAd.timestamp,
      byCurrency: {
        UAH: latestAd.priceUAH,
        USD: latestAd.priceUSD,
      },
    };
  }
  return undefined;
};
