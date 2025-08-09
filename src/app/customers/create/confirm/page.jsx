"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

// メインコンポーネントをSuspenseでラップ
export default function ConfirmPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPage />
    </Suspense>
  );
}

function ConfirmPage() {
  const router = useRouter();
  const customer_id = useSearchParams().get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      if (customer_id) {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData);
      }
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          正常に作成しました
        </div>
        {customer && <OneCustomerInfoCard {...customer} />}
        <button
          className="btn btn-primary m-4 text-2xl"
          onClick={() => router.push("./../../customers")}
        >
          戻る
        </button>
      </div>
    </>
  );
}