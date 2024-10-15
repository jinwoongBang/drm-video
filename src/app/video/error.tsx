"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/modal";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setErrorMessage(error.message);
  }, [error]);

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      <h1>error</h1>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div>{errorMessage}</div>
      </Modal>
    </div>
  );
}
