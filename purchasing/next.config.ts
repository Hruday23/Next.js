import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.GITHUB_PAGES === "true" ? "/Next.js" : undefined,
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
  },
};

export default nextConfig;
