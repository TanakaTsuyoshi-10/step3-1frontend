'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import OneCustomerInfoCard from '@/app/components/one_customer_info_card.jsx';
import BackButton from './back_button';
import fetchCustomer from './fetchCustomer';

export default function ReadPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchCustomer(id);
        // APIが配列を返しても単体を返してもOKにする
        setCustomerInfo(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        console.error(e);
        setError('読み込みに失敗しました');
      }
    })();
  }, [id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      {error && <div className="p-4 text-red-600">{error}</div>}
      {!error && !customerInfo && <div className="p-4">読み込み中...</div>}
      {customerInfo && <OneCustomerInfoCard {...customerInfo} />}
      <BackButton>戻る</BackButton>
    </div>
  );
}