export default async function fetchCustomer(id) {
  const url = `/api/customers?customer_id=${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    cache: 'no-store',
    // クライアント／サーバどちらでも動作OK
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch customer ${id}: ${res.status} ${text}`);
  }
  return res.json();
}
