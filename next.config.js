/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
  },
  webpack: (config) => {
    // Add rule to handle .geojson files
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'json',
    })

    return config
  },
}

module.exports = nextConfig
