/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GRAPH_URI: process.env.NEXT_PUBLIC_GRAPH_URI,
    NEXT_MARKET_TOKEN: process.env.NEXT_MARKET_TOKEN,
  },

  // https://github.com/ProjectOpenSea/opensea-js/issues/421
  webpack5: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
