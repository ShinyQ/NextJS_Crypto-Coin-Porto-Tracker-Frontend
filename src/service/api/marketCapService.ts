import axios from 'axios';

export async function fetchCoinData(symbols: string): Promise<any> {
    const url = `https://coin-porto-tracker-be-three.vercel.app/api/coin-data?symbols=${symbols}`;
    
    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data. Response status: " + response.status);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data");
    }
}
