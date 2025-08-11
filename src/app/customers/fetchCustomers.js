// src/app/customers/fetchCustomers.js
import 'server-only';
import { headers } from 'next/headers';

// 実行時の絶対オリジンを決める
function getOrigin() {
  // あるならこれが最優先（例: https://app-002-gen10-step3-1-node-oshima30.azurewebsites.net）
  const fromEnv = process.env.NEXT_PUBLIC_APP_ORIGIN;
  if (fromEnv) return fromEnv.replace(/\/+$/, '');

  // 無ければリクエストヘッダから組み立て
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = (h.get('x-forwarded-proto') ?? 'https').split(',')[0];
  if (!host) throw new Error('Cannot resolve origin (no Host header).');
  return `${proto}://${host}`;
}

export const dynamic = 'force-dynamic'; // SSRで毎回取得

export default async function fetchCustomers() {
  const origin = getOrigin();
  const url = `${origin}/api/allcustomers`;

  const res = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
    // headers: { 'accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch URL: ${url}\n${res.status} ${text}`);
  }
  return res.json();
}
