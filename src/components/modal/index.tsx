"use client";

import React, { useEffect } from "react";
import Portal from "../portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const keyDownEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;

    document.body.addEventListener("keydown", keyDownEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", keyDownEscapeKey);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative z-10 bg-white rounded-lg p-6">
          {children}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
