// 重要: 静的化を無効にして必ずサーバーで描画
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import fetchCustomers from './fetchCustomers';
import Link from 'next/link';

export default async function CustomersPage() {
  let customers = [];
  let errorMessage = '';

  try {
    customers = await fetchCustomers();
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Link href="/customers/create" className="btn btn-primary">
            Create
          </Link>
        </header>

        {errorMessage ? (
          <div className="alert alert-error">
            <span>データ取得に失敗しました: {errorMessage}</span>
          </div>
        ) : customers?.length === 0 ? (
          <p>顧客情報がありません。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {customers.map((c) => (
              <div key={c.customer_id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h2 className="card-title">{c.customer_name ?? '名前未設定'}</h2>
                  <p>Customer ID: {c.customer_id}</p>
                  <p>Age: {c.age}</p>
                  <p>Gender: {c.gender}</p>
                  <div className="card-actions justify-end">
                    <Link href={`/customers/read/${encodeURIComponent(c.customer_id)}`} className="btn btn-outline btn-sm">
                      Read
                    </Link>
                    <Link href={`/customers/update/${encodeURIComponent(c.customer_id)}`} className="btn btn-outline btn-sm">
                      Update
                    </Link>
                    <Link href={`/customers/delete/${encodeURIComponent(c.customer_id)}`} className="btn btn-outline btn-sm">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
