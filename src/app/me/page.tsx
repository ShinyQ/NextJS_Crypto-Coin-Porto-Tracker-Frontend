import coin from "@/data/coin2.json";
import CoinList from "@/components/CoinList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="font-bold text-2xl my-3 pt-3 text-center sm:text-left">Crypto Portfolio Tracker</h3>
      <p className="mb-3 text-center sm:text-left">
        Made by <a className="font-bold text-blue-800 dark:text-blue-300 hover:underline" href="https://github.com/ShinyQ" target="_blank" rel="noopener noreferrer">@ShinyQ</a> Powered by <a className="font-bold text-blue-800 dark:text-blue-300 hover:underline" href="https://coinmarketcap.com/api/" target="_blank" rel="noopener noreferrer">@CoinMarketCap</a>
      </p>
      <CoinList data={coin} startPortfolio={185000000} />
    </main>
  );
}
