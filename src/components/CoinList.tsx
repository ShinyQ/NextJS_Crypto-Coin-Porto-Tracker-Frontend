"use client";

import React, { useEffect, useState } from "react";
import { formatToRupiah, formatToDollar } from "@/utils/common";
import { fetchCoinData } from "@/service/api/marketCapService";
import { Coin, MarketCapData } from "@/types/coin";

const CoinList: React.FC<{ data: Coin[] }> = ({ data }) => {
  const [coinData, setCoinData] = useState<(Coin & MarketCapData)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = "BTC,ETH,MANTA,MATIC,FLOKI,AEG";
        const MarketCapData = await fetchCoinData(symbols); // Call the service

        const combinedData = data.map((coin) => {
          const coinDataArray = MarketCapData[coin.coin_slug.toUpperCase()];
          const coinData = coinDataArray ? coinDataArray[0] : null;
          return {
            ...coin,
            ...(coinData || {}),
          } as Coin & MarketCapData;
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalReturn = coinData
    .reduce((acc, coin) => acc + (coin.quote?.USD?.percent_change_24h ?? 0), 0)
    .toFixed(2);

  const totalPortofolio = coinData.reduce((acc, coin, index) => {
    const price = coin.quote?.USD?.price;
    const value = price * data[index].coin_total * 15600;
    return acc + value;
  }, 0);

  return (
    <div className="pb-5">
      <p className="text-base">
        Total Nilai Portofolio: {formatToRupiah(totalPortofolio)}
      </p>
      <p className="text-base">
        Total Persentase Hari Ini: &nbsp;
        <span
          className="font-bold"
          style={{
            color: parseFloat(totalReturn) >= 0 ? "green" : "red",
          }}
        >
          {totalReturn}%
        </span>
      </p>

      {coinData.map((coin, index) => (
        <div key={coin.id} className="mt-5 mb-5">
          <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="">
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={data[index].img}
                    alt={data[index].name}
                  />
                  <div className="text-gray-900 font-bold text-xl mb-2 mt-2">
                    {data[index].name}
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  Jumlah Koin: {data[index].coin_total}
                </p>

                <p className="text-gray-700 text-base">
                  Harga Saat Ini: {formatToDollar(coin.quote?.USD?.price)}
                </p>

                <p className="text-gray-700 text-base mt-5 font-bold">
                  Nilai Jual (Rp):
                </p>
                <p className="text-gray-700 text-base">
                  {coin.quote?.USD?.price && data[index].coin_total
                    ? formatToRupiah(
                        coin.quote?.USD?.price * data[index].coin_total * 15600
                      )
                    : "Data not available"}
                </p>
                <p className="text-gray-700 text-base font-bold mt-3">
                  Persentase Kenaikan: <br />
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
        </div>
      ))}
    </div>
  );
};

export default CoinList;
