// サーバー専用にしてビルド時の取り込みを防ぐ
import 'server-only';

const API_BASE = (process.env.NEXT_PUBLIC_API_ENDPOINT || '').replace(/\/+$/, '');

export default async function fetchCustomers() {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_ENDPOINT is not set');
  }

  const url = `${API_BASE}/allcustomers`;

  // App Router で確実に都度取得させる設定
  const res = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
    // もし API が https のみ/ヘッダ必須などあればここで追加
    // headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch customers: ${res.status} ${text}`);
  }

  return res.json();
}
