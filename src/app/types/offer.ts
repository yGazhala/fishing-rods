export type Offer = {
  id: number;
  rodId: string;
  isUsed: boolean;
  priceUAH: number;
  priceUSD: number;
  timestamp: number;
  description?: string;
  sellerName: string;
  url?: string;
};
