"use client";

import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Modal from "@/components/modal";
import { errorState } from "@/store/error";
import { ShakaError } from "@/constants/error";
import { useRouter } from "next/navigation";
import {
  modalActionState,
  modalContentState,
  isShowModalState,
  modalTitleState,
  modalTypeState,
  buttonTextState,
} from "@/store/modal";
import { isFreeEpisodeSelector } from "@/store/program";
// import { useRouter } from "next/router";

function AlertModal() {
  const router = useRouter();

  const [isShow, setIsShow] = useRecoilState(isShowModalState);
  const [title, setTitle] = useRecoilState(modalTitleState);
  const [content, setContent] = useRecoilState(modalContentState);
  const [type, setType] = useRecoilState(modalTypeState);
  const [action, setAction] = useRecoilState(modalActionState);
  const [buttonText, setButtonText] = useRecoilState(buttonTextState);

  const isFreeEpisode = useRecoilValue(isFreeEpisodeSelector);

  useEffect(() => {
    setIsShow(!isFreeEpisode);
    setTitle("이 에피소드는 앱에서 시청 가능해요!");
    setContent("지금 앱에서 더 많은 에피소드를 감상해보세요.");
    setButtonText("앱 다운로드 켜기");
  }, [isFreeEpisode]);

  const handleClose = () => {
    action();
    router.push(`/`);
  };

  return (
    <Modal isOpen={isShow} onClose={handleClose}>
      <div className="bg-black text-white p-6 rounded-lg w-4/6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{content}</p>
        <button
          onClick={handleClose}
          className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

export default AlertModal;
