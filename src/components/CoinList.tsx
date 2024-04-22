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

const CoinList: React.FC<{ data: Coin[]; startPortofolio: number }> = ({
  data,
  startPortofolio,
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

  const totalPortofolio = calculateTotalPortfolio(coinData, data);
  const totalReturn = calculateTotalReturn(coinData);

  const formatCoinValue = (coin: MarketCapData, index: number) => {
    const value = coin.quote?.USD?.price * data[index].coin_total * RUPIAH_AMOUNT;
    return value ? formatToRupiah(value) : "Data not available";
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
    <div className="p-2 mx-5">

      <div className="text-center">
        <p>Modal Investasi: {formatToRupiah(startPortofolio)}</p>
        <p>
          Total Keuntungan:{" "}
          <span
            className="font-bold"
            style={{
              color:
                totalPortofolio - startPortofolio >= 0 ? "green" : "red",
            }}
          >
            {formatToRupiah(totalPortofolio - startPortofolio)}
          </span>
        </p>
        <p className="mb-5">
          Persentase Keseluruhan:{" "}
          <span
            className="font-bold"
            style={{
              color:
                parseFloat(
                  calculateROI(startPortofolio, totalPortofolio)
                ) >= 0
                  ? "green"
                  : "red",
            }}
          >
            {calculateROI(startPortofolio, totalPortofolio)}%
          </span>
        </p>
        <p>Portofolio Saat Ini: {formatToRupiah(totalPortofolio)}</p>
        <p>
          Total Persentase Hari Ini:{" "}
          <span
            className="font-bold"
            style={{
              color: parseFloat(totalReturn) >= 0 ? "green" : "red",
            }}
          >
            {totalReturn}%
          </span>
        </p>
        <button
          className="bg-orange-500 hover:bg-orange  -700 text-white py-1 px-3 rounded mt-3"
          onClick={() => setShowValue(!showValue)}
        >
          {showValue ? "👀" : "😣"}
        </button>
      </div>

      <div className="flex flex-wrap justify-between p-5 lg:ml-50 lg:mr-50 mb-5">
        {sortedCoins.map((coin, index) => (
          <div key={coin.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-5">
            <div className="border border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal">
              <div className="mb-4">
                <div className="flex items-center mb-3">
                <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-900 font-bold text-xl mb-2 mt-2">
                    {index + 1}
                  </div>
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={data[coinData.indexOf(coin)].img}
                    alt={data[coinData.indexOf(coin)].name}
                  />
                  <div className="text-gray-900 font-bold text-xl mb-2 mt-2">
                    {data[coinData.indexOf(coin)].name}
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  Jumlah Koin:{" "}
                  {renderValue(
                    formatTotalCoin(data[coinData.indexOf(coin)].coin_total),
                    showValue
                  )}
                </p>
                <p className="text-gray-700 text-base">
                  Harga Saat Ini: {formatToDollar(coin.quote?.USD?.price)}
                </p>
                <p className="text-gray-700 text-base mt-5 font-bold">
                  Nilai Jual (Rp):{" "}
                  {renderValue(formatCoinValue(coin, coinData.indexOf(coin)), showValue)}
                </p>
                <p className="text-gray-700 text-base font-bold mt-3">
                  Persentase Hari Ini: <br />
                </p>
                <p
                  className="text-gray-700 text-base font-bold"
                  style={{
                    color:
                      coin.quote?.USD?.percent_change_24h >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coin.quote?.USD?.percent_change_24h >= 0 ? "+" : ""}
                  {(coin.quote?.USD?.percent_change_24h).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
