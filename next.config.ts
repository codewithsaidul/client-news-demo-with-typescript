import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    minimumCacheTTL: 60 * 60 * 24 * 30,

    dangerouslyAllowSVG: false,
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
