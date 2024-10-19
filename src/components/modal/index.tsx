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
        {children}
      </div>
    </Portal>
  );
}

export default Modal;
