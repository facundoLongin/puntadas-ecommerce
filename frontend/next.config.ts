import type { NextConfig } from "next";
import path from "node:path";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("..")
  },
  ...(isStaticExport
    ? {
        output: "export" as const,
        images: {
          unoptimized: true
        },
        trailingSlash: true
      }
    : {})
};

export default nextConfig;
