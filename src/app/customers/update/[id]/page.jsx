"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import fetchCustomer from "./fetchCustomer";
import updateCustomer from "./updateCustomer";

export default function UpdatePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const formRef = useRef(null);

  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      // ★ 修正前の fetchCustomer をそのまま利用
      const data = await fetchCustomer(id);
      setCustomerInfo(Array.isArray(data) ? data[0] : data);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    await updateCustomer(fd);
    const nextId = fd.get("customer_id");
    router.push(`/customers/update/${nextId}/confirm`); // 絶対パス
  };

  if (!customerInfo) return <div className="p-4">読み込み中...</div>;

  const {
    customer_name = "",
    customer_id = "",
    age = "",
    gender = "",
  } = customerInfo;

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
      <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="card-body">
            <h2 className="card-title">
              <p>
                <input
                  type="text"
                  name="customer_name"
                  defaultValue={customer_name}
                  className="input input-bordered"
                />
                さん
              </p>
            </h2>

            <p className="mt-2">
              Customer ID:
              <input
                type="text"
                name="customer_id"
                defaultValue={customer_id}
                className="input input-bordered ml-2"
              />
            </p>

            <p className="mt-2">
              Age:
              <input
                type="number"
                name="age"
                defaultValue={age}
                className="input input-bordered ml-2"
              />
            </p>

            <p className="mt-2">
              Gender:
              <input
                type="text"
                name="gender"
                defaultValue={gender}
                className="input input-bordered ml-2"
              />
            </p>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary m-4 text-2xl">更新</button>
          </div>
        </form>
      </div>
    </div>
  );
}