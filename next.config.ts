import type { NextConfig } from "next";

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/api/:path*",
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "*", // Set your origin
//           },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET, POST, PUT, DELETE, OPTIONS",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "Content-Type, Authorization",
//           },
//         ],
//       },
//     ]
//   },
// }

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
          protocol: "http",
          hostname: "127.0.0.1",
          port: "8000",
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
