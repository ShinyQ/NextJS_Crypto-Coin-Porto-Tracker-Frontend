import coin from "@/data/coin2.json";
import CoinList from "@/components/CoinList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="font-bold text-2xl my-3 pt-3">Crypto Portofolio Tracker</h3>
      <p className="mb-3">
        Made by <a className="font-bold" style={{ color: "green" }} href="https://github.com/ShinyQ" target="_blank">@ShinyQ</a> Powered by CoinMarketCap
      </p>
      <CoinList data={coin} startPortofolio={65000000} />
    </main>
  );
}
