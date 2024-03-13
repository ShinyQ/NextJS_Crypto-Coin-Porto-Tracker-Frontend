export type Coin = {
    id: number;
    name: string;
    img: string;
    coin_total: number;
    coin_slug: string;
  };

export type MarketCapData = {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    quote: {
      USD: {
        price: number;
        percent_change_24h: number;
      };
    };
  };