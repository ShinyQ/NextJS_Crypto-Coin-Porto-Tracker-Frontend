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
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  }).format(number)
}

export function calculateROI(startPortfolio: number, totalPortfolio: number): string {
  const roi = (((totalPortfolio - startPortfolio) / startPortfolio) * 100);
  return roi.toFixed(2);
}

export function calculateTotalReturn(coinData: (Coin & MarketCapData)[], data: Coin[]): string {
  const totalReturn = coinData.reduce((acc, coin, index) => {
    const change = (data[index]?.coin_total !== 0) ? (coin.quote?.USD?.percent_change_24h ?? 0) : 0;
    return acc + change;
  }, 0);
  
  return totalReturn.toFixed(2);
}

export function calculateTotalPortfolio(coinData: (Coin & MarketCapData)[], data: Coin[]): number {
  return coinData.reduce((acc, coin, index) => {
    const price = coin.quote?.USD?.price ?? 0;
    const value = price * (data[index]?.coin_total ?? 0) * 15800;
    return acc + value;
  }, 0);
}

export function formatTotalCoin(totalCoin: number){
  const formattedNumber = totalCoin.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 10
  });

  return formattedNumber
}
