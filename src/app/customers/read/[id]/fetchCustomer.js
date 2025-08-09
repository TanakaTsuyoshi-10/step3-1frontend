export default async function fetchCustomer(id) {
  const base = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://127.0.0.1:8000';
  const res = await fetch(`${base}/customers?customer_id=${encodeURIComponent(id)}`, {
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}