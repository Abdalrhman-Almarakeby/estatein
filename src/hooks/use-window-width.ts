import { useEffect, useState } from "react";

export function useWindowWidth() {
  const isClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isClient ? window.innerWidth : undefined,
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(window.innerWidth);
    }

    if (isClient) {
      window.addEventListener("resize", setSize);

      return () => window.removeEventListener("resize", setSize);
    }
  }, [isClient, setWindowSize]);

  return windowSize;
}
