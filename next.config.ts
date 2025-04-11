import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "todofy.blob.core.windows.net" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "d1nbslm0j6pual.cloudfront.net" },
    ],
  },
  experimental: {
    nodeMiddleware: true,
  },
}

export default nextConfig
