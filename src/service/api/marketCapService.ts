export async function fetchCoinData(symbols: string): Promise<any> {
    const url = `https://coin-porto-tracker-be-three.vercel.app/api/coin-data?symbols=${symbols}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data. Response status: " + response.status);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data");
    }
}
