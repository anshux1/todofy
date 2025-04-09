import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "todofy.blob.core.windows.net" }],
  },
}

export default nextConfig
