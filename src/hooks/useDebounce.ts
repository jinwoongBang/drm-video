import { useState, useEffect } from "react";

function useDebounce<T>(callback: () => void, value: T, delay: number) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}

export default useDebounce;
