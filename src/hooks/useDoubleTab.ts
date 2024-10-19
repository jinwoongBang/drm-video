import { useCallback, useRef } from "react";

interface UseDoubleTabOptions {
  onDoubleTab: () => void;
  delay?: number;
}

export const useDoubleTab = ({
  onDoubleTab,
  delay = 300,
}: UseDoubleTabOptions) => {
  const lastTab = useRef<number>(0);

  const handleTab = useCallback(() => {
    const now = Date.now();
    if (now - lastTab.current < delay) {
      onDoubleTab();
    }
    lastTab.current = now;
  }, [onDoubleTab, delay]);

  return handleTab;
};
