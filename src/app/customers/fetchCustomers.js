// src/app/customers/fetchCustomers.js
// App Router のサーバー実行を想定（クライアントでも使える書き方）
export default async function fetchCustomers() {
  const res = await fetch('/api/allcustomers', {
    cache: 'no-store',
    next: { revalidate: 0 },
    // 必要ならヘッダを追加:
    // headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch customers: ${res.status} ${text}`);
  }
  return res.json();
}
