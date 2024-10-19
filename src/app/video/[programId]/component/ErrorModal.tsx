"use client";

import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

import Modal from "@/components/modal";
import { errorState } from "@/store/error";

function ErrorModal() {
  const [error, setError] = useRecoilState(errorState);

  const isOpen = useMemo(() => !!error, [error]);

  const handleClose = () => {
    setError(null);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className="bg-black text-white p-6 rounded-lg w-4/6">
        {/* <h2 className="text-xl font-bold mb-4">오류 발생</h2> */}
        <p className="mb-6">{error?.message}</p>
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
