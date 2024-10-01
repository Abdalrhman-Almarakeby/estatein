import { useLayoutEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
