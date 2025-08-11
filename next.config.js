// next.config.js
const API = (process.env.NEXT_PUBLIC_API_ENDPOINT || '').replace(/\/+$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
  async rewrites() {
    // フロントの /api/* を、バックエンド(API)の /* に中継
    return API
      ? [{ source: '/api/:path*', destination: `${API}/:path*` }]
      : [];
  },
};

module.exports = nextConfig;
