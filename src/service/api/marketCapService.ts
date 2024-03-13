import axios from 'axios';

export async function fetchCoinData(symbols: string): Promise<any> {
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbols}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': 'a5eb2931-37db-4757-ab07-f7b1e02cbed5',
            },
        });

        if (response.status !== 200) {
            throw new Error("Failed to fetch data. Response status: " + response.status);
        }
        const { data } = response.data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data");
    }
}
