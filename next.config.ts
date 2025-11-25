import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  reactStrictMode: false,
  trailingSlash: true,
  transpilePackages: ['three'],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.spacematch.com.ng",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },

  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },

  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
