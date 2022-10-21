/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GRAPH_URI: process.env.NEXT_PUBLIC_GRAPH_URI,
    NEXT_MARKET_TOKEN: process.env.NEXT_MARKET_TOKEN,
  },
};

module.exports = nextConfig;
