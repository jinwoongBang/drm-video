"use client";

import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

import Modal from "@/components/modal";
import { errorState } from "@/store/error";
import { ShakaError } from "@/constants/error";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

function ErrorModal() {
  const router = useRouter();

  const [error, setError] = useRecoilState(errorState);

  const isOpen = useMemo(() => !!error, [error]);

  const errorMessage = useMemo(() => {
    if (!error) return "";

    if (error instanceof ShakaError) {
      return `[${error.severity} - ${error.category} - ${error.code}] 오류가 발생했습니다. 다시 시도해 주세요!`;
    }

    return `[${error.code}] ${error.message}`;
  }, [error]);

  const handleClose = () => {
    setError(null);
    router.push(`/`);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-black text-white p-6 rounded-lg w-4/6">
        {/* <h2 className="text-xl font-bold mb-4">오류 발생</h2> */}
        <p className="mb-6">{errorMessage}</p>
        <button
          onClick={handleClose}
          className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

export default ErrorModal;
