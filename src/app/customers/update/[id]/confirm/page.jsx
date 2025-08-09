'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import OneCustomerInfoCard from '@/app/components/one_customer_info_card.jsx';
import fetchCustomer from '../fetchCustomer'; // パスは実ファイル位置に合わせて

export default function UpdatePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePage />
    </Suspense>
  );
}

function UpdatePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchCustomer(id);
        // APIが配列を返しても単体を返してもOKに
        setCustomer(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        console.error(e);
        setError('読み込みに失敗しました');
      }
    })();
  }, [id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">更新しました</div>

      {error && <div className="p-3 text-red-600">{error}</div>}
      {!error && !customer && <div className="p-3">読み込み中...</div>}
      {customer && <OneCustomerInfoCard {...customer} />}

      <a href="/customers" className="btn btn-outline btn-accent flex justify-center mt-4">
        一覧に戻る
      </a>
    </div>
  );
}