/** @type {import('next').NextConfig} */
const nextConfig = {
    "env": {
        RUPIAH_AMOUNT: "16500",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'logodownload.org',
            },
            {
                protocol: 'https',
                hostname: 'th.bing.com',
            },
            {
                protocol: 'https',
                hostname: 's2.coinmarketcap.com',
            }
        ],
    },
};

export default nextConfig;
