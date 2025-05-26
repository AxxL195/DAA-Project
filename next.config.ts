/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // or false if not using
  },
  images: {
    domains: ['m.media-amazon.com'],
  }
};

module.exports = nextConfig;