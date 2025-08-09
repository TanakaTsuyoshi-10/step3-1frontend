"use client";

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import deleteCustomer from "./deleteCustomer";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeletePage() {
  const params = useParams();
  const customerId = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!customerId) return;
    (async () => {
      try {
        const data = await fetchCustomer(customerId); // ← 既存の関数をそのまま使用
        setCustomer(Array.isArray(data) ? data[0] : data); // 配列/単体どちらでもOKに
      } catch (e) {
        console.error(e);
        setErr("読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    })();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteCustomer(customerId);
      // ルーティングに合わせてどちらかを使ってください（通常は前者）
      router.push(`/customers/delete/${customerId}/confirm`); // 推奨: 動的パス配下の confirm
      // router.push(`/customers/delete/confirm?customer_id=${customerId}`); // クエリ版を使う場合はこちら
    } catch (e) {
      console.error(e);
      setErr("削除に失敗しました");
    }
  };

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      {loading && <div className="p-3">読み込み中...</div>}
      {err && <div className="p-3 text-red-600">{err}</div>}
      {customer && <OneCustomerInfoCard {...customer} />}

      <button className="btn btn-primary m-4 text-2xl" onClick={handleSubmit}>
        削除
      </button>
    </div>
  );
}