import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  experimental: {
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
