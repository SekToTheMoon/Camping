import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gdgydvousbaelarkzque.supabase.co",
      },
    ],
  },

  devIndicators: {
    appIsrStatus: true, // defaults to true
    buildActivity: true, // defaults to true
  },
};

export default nextConfig;
