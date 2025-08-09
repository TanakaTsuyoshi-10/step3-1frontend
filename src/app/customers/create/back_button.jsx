"use client";
import { useRouter } from "next/navigation";

const BackButton = (props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("./create/confirm");
  };

  return (
    <button
      className="btn btn-primary m-4 text-2xl"
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default BackButton;