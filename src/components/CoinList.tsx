"use client";

import React, { useEffect, useState } from "react";
import {
  formatToRupiah,
  formatToDollar,
  calculateROI,
  calculateTotalReturn,
  calculateTotalPortfolio,
  formatTotalCoin,
} from "@/utils/common";
import { fetchCoinData } from "@/service/api/marketCapService";
import { Coin, MarketCapData } from "@/types/coin";
import { RUPIAH_AMOUNT } from "@/utils/constant";
import Image from "next/image";

const CoinList: React.FC<{ data: Coin[]; startPortfolio: number }> = ({
  data,
  startPortfolio,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [coinData, setCoinData] = useState<(Coin & MarketCapData)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showValue, setShowValue] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = data.map((item) => item.coin_slug).join(",");
        const MarketCapData = await fetchCoinData(symbols);

        const combinedData = data.map((coin) => {
          const coinDataArray = MarketCapData[coin.coin_slug.toUpperCase()];
          const coinData = coinDataArray ? coinDataArray[0] : null;

          return { ...coin, ...(coinData || {}) } as Coin & MarketCapData;
        });

        setCoinData(combinedData);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPortfolio = calculateTotalPortfolio(coinData, data);
  const totalReturn = calculateTotalReturn(coinData, data);

  const formatCoinValue = (coin: MarketCapData, index: number) => {
    const value = coin.quote?.USD?.price * data[index].coin_total * RUPIAH_AMOUNT;
    return value ? formatToRupiah(value) : "-";
  };

  const sortedCoins = [...coinData].sort((a, b) => {
    const returnA = a.quote?.USD?.price * data[coinData.indexOf(a)].coin_total * RUPIAH_AMOUNT || 0;
    const returnB = b.quote?.USD?.price * data[coinData.indexOf(b)].coin_total * RUPIAH_AMOUNT || 0;
    return returnB - returnA;
  });

  const renderValue = (value: string | number, condition: boolean) => {
    return showValue ? value : "***";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Investment Capital Card */}
          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-blue-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Modal Investasi</p>
                <p className="text-l font-semibold text-card-foreground">{formatToRupiah(startPortfolio)}</p>
              </div>
            </div>
          </div>

          {/* Total Profit Card */}
          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-green-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Keuntungan</p>
                <p className={`text-l font-semibold ${totalPortfolio - startPortfolio >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatToRupiah(totalPortfolio - startPortfolio)}
                </p>
              </div>
            </div>
          </div>

          {/* Overall Percentage Card */}
          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-purple-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Persentase Keseluruhan</p>
                <p className={`text-l font-semibold ${parseFloat(calculateROI(startPortfolio, totalPortfolio)) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {calculateROI(startPortfolio, totalPortfolio)}%
                </p>
              </div>
            </div>
          </div>

          {/* Current Portfolio Card */}
          <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2.5 bg-yellow-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Portfolio Saat Ini</p>
                <p className="text-l font-semibold text-yellow-500">{formatToRupiah(totalPortfolio)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coin List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCoins.map((coin, index) => (
            <div key={`${coin.id}-${data[coinData.indexOf(coin)].name}`} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={data[coinData.indexOf(coin)].img}
                        alt={data[coinData.indexOf(coin)].name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {data[coinData.indexOf(coin)].name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Rank #{index + 1}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    coin.quote?.USD?.percent_change_24h >= 0 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {coin.quote?.USD?.percent_change_24h >= 0 ? '+' : ''}
                    {(coin.quote?.USD?.percent_change_24h).toFixed(2)}%
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Jumlah Koin</span>
                    <span className="text-sm font-medium text-card-foreground">
                      {renderValue(formatTotalCoin(data[coinData.indexOf(coin)].coin_total), showValue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Harga Sekarang</span>
                    <span className="text-sm font-medium text-card-foreground">
                      {formatToDollar(coin.quote?.USD?.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-sm font-medium text-card-foreground">Nilai Jual (Rp)</span>
                    <span className="text-sm font-bold text-card-foreground">
                      {renderValue(formatCoinValue(coin, coinData.indexOf(coin)), showValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoinList;
