import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: ".build",
  images: {
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
