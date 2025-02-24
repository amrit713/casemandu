import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bj9m5xnu4d.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
