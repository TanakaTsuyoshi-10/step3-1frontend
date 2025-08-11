/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // （任意）HTMLに埋める公開値があればここで定義
  env: {
    NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN || '',
  },
  // ここが重要：/api/* を FastAPI へプロキシ
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
    if (!target) {
      // 環境変数が未設定ならリライトなし（＝/api は404になる）
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${target.replace(/\/+$/, '')}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
