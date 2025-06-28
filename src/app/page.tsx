import coin from "@/data/coin.json";
import CoinList from "@/components/CoinList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <h3 className="font-bold text-2xl m-5 pt-3 text-foreground">Portfolio Tracker</h3>
      <CoinList data={coin} startPortfolio={100000000} />
    </main>
  );
}
