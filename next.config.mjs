import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true
  },
  images: {
    domains: ['media.licdn.com', 'example.com', 'insead.edu', 'encrypted-tbn0.gstatic.com', 'upload.wikimedia.org'],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src") // use process.cwd() for better ESM support
    };
    return config;
  }
};

export default nextConfig;
