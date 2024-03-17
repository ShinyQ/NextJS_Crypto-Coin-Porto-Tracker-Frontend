import { Coin, MarketCapData } from "@/types/coin";

export function formatToRupiah(number: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number);
}

export function formatToDollar(number: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
  }).format(number)
}

export function calculateROI(startPortofolio: number, totalPortofolio: number): string {
  const roi = (((totalPortofolio - startPortofolio) / startPortofolio) * 100);
  return roi.toFixed(2);
}

export function calculateTotalReturn(coinData: (Coin & MarketCapData)[]): string {
  const totalReturn = coinData.reduce((acc, coin) => acc + (coin.quote?.USD?.percent_change_24h ?? 0), 0);
  return totalReturn.toFixed(2);
}

export function calculateTotalPortfolio(coinData: (Coin & MarketCapData)[], data: Coin[]): number {
  return coinData.reduce((acc, coin, index) => {
    const price = coin.quote?.USD?.price ?? 0;
    const value = price * (data[index]?.coin_total ?? 0) * 15600;
    return acc + value;
  }, 0);
}
