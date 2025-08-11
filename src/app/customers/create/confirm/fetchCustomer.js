// サーバー専用
import 'server-only';

export const dynamic = 'force-dynamic';

export default async function fetchCustomer(id) {
  const url = `/api/customers?customer_id=${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch customer ${id}: ${res.status} ${text}`);
  }
  return res.json();
}
