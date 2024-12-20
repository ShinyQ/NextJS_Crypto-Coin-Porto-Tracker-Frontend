import coin from "@/data/coin.json";
import CoinList from "@/components/CoinList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="font-bold text-2xl m-5 pt-3">Portofolio Tracker</h3>
      <CoinList data={coin} startPortofolio={100000000} />
    </main>
  );
}
