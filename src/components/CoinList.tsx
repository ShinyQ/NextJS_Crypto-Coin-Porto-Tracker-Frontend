"use client";
import React, { useEffect, useState } from "react";
import formatToRupiah from "@/utils/common";

type Coin = {
  id: number;
  name: string;
  img: string;
  coin_total: number;
  coin_endpoint: string;
};

type FetchedData = {
  Symbol: string;
  Name: string;
  Address: string;
  Blockchain: string;
  Price: number;
  PriceYesterday: number;
  VolumeYesterdayUSD: number;
  Time: string;
  Source: string;
  Signature: string;
};

const CoinList: React.FC<{ data: Coin[] }> = ({ data }) => {
  const [coinData, setCoinData] = useState<FetchedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = data.map((coin) =>
        fetch(coin.coin_endpoint)
          .then((response) => response.json())
          .then((fetchedData: FetchedData) => fetchedData)
      );

      Promise.all(promises)
        .then((fetchedData) => {
          setCoinData(fetchedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [data]);

  const totalReturn = coinData
    .reduce((acc, coin) => {
      const percentageChange =
        ((coin.Price - coin.PriceYesterday) / coin.PriceYesterday) * 100;
      return acc + percentageChange;
    }, 0)
    .toFixed(2);

  const totalValue = coinData.reduce((acc, coin, index) => {
    let price = coin.Price;

    // Check if the coin is "Manta", set the price to 3.8
    if (data[index].name === "Manta") {
      price = 3.8;
    }

    const value = price * data[index].coin_total * 15600;
    return acc + value;
  }, 0);

  const formattedTotal = formatToRupiah(totalValue);

  return (
    <div>
      <p className="text-base">Total Nilai Portofolio: {formattedTotal} </p>
      Total Persentase Keuntungan: +{totalReturn}%
      {coinData.map((coin, index) => (
        <div key={data[index].id} className="mt-5 mb-5">
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
                  Harga Kemarin: {coin.PriceYesterday.toFixed(8)}
                </p>
                <p className="text-gray-700 text-base">
                  Harga Saat Ini: {coin.Price.toFixed(8)}
                </p>

                <p className="text-gray-700 text-base mt-5 font-bold">
                  Nilai Jual:
                </p>
                <p className="text-gray-700 text-base font-bold">
                  {data[index].name === "Manta"
                    ? formatToRupiah(3.8 * data[index].coin_total * 15600)
                    : coin.Price && data[index].coin_total
                    ? formatToRupiah(
                        coin.Price * data[index].coin_total * 15600
                      )
                    : "Data not available"}
                </p>
                <p className="text-gray-700 text-base font-bold mt-3">
                  Persentase Kenaikan: <br />
                </p>
                <p
                  className="text-gray-700 text-base font-bold"
                  style={{
                    color: coin.Price > coin.PriceYesterday ? "green" : "red",
                  }}
                >
                  {coin.Price > coin.PriceYesterday ? "+" : "-"}
                  {(
                    ((coin.Price - coin.PriceYesterday) / coin.PriceYesterday) *
                    100
                  ).toFixed(2)}
                  %
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
