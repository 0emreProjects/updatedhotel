/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    // Enable Next.js image optimization for local images (better responsive delivery)
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1280, 1600],
  },
}

module.exports = nextConfig

