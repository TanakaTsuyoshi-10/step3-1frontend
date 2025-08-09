"use client";

import { useRouter } from "next/navigation";

const BackButton = (props) => {
  const router = useRouter();

  return (
    <button
      className="btn btn-primary m-4 text-2xl"
      onClick={() => router.push("./../../customers")}
    >
      {props.children}
    </button>
  );
};

export default BackButton;