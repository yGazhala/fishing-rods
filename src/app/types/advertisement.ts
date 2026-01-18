export type Advertisement = {
  id: string;
  rodId: string;
  isUsed: boolean;
  priceUAH: number;
  priceUSD: number;
  date: string;
  description?: string;
  sellerName: string;
  url?: string;
}
