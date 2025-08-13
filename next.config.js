/** @type {import('next').NextConfig} */
const nextConfig = {
  // Azure App Service の Node ランタイムで実行しやすい単一出力
  output: 'standalone',

  // （任意）公開してもよい値だけを HTML/JS に埋め込む
  env: {
    NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN || '',
  },

  /**
   * 重要：
   * いまは Route Handler（src/app/api/.../route.js）で
   * FastAPI へプロキシする方式に統一するため、rewrites は無効化。
   * ここを有効にすると /api/* が外部へ直接飛び、Route と競合して 404/混乱の元になります。
   */
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
