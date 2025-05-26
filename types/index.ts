export type PriceHistoryItem = {
    price: number;
};

export type Product = {
    _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  realPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  isOutOfStock: boolean;
  discountRate: number;
};