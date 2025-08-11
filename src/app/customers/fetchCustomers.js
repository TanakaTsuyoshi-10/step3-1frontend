import 'server-only';

export const dynamic = 'force-dynamic';

export default async function fetchCustomers() {
  const res = await fetch('/api/allcustomers', {
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch /api/allcustomers: ${res.status} ${text}`);
  }
  return res.json();
}
