export async function fetchCoinData(symbols: string): Promise<any> {
    try {
        const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=a5eb2931-37db-4757-ab07-f7b1e02cbed5&symbol=${symbols}`
        );
        const { data } = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching data");
    }
}