export type PricesByMonth = {
  monthLabel: string;
  monthStartTimestamp: number;
  newRodPrices: number[];
  usedRodPrices: number[];
  newRodAveragePrice: number | null;
  usedRodAveragePrice: number | null;
};
