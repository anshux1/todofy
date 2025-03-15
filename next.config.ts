import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "d1nbslm0j6pual.cloudfront.net",
      },
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
}

export default nextConfig
