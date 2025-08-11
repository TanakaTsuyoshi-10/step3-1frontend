// src/app/customers/fetchCustomers.js
import 'server-only';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic'; // 毎回取得

function getOrigin() {
  // （任意）環境変数に明示的なオリジンがあれば最優先
  const fromEnv = process.env.NEXT_PUBLIC_APP_ORIGIN;
  if (fromEnv) return fromEnv.replace(/\/+$/, '');

  // 無ければリクエストヘッダから推定（App Service では x-forwarded-* が付く）
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = (h.get('x-forwarded-proto') ?? 'https').split(',')[0];
  if (!host) throw new Error('Cannot resolve origin (no Host header)');
  return `${proto}://${host}`;
}

export default async function fetchCustomers() {
  const origin = getOrigin();
  const url = `${origin}/api/allcustomers`;

  const res = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch URL: ${url} ${res.status} ${text}`);
  }
  return res.json();
}
