import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce, useWindowSize } from "@/hooks";

const MIN_SCROLL_AMOUNT = 50;

export function useMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const debouncedIsOpen = useDebounce(isOpen);
  const windowSize = useWindowSize();

  const isMenuHidden = useMemo(() => {
    return windowSize.width < 768 && !isOpen;
  }, [isOpen, windowSize.width]);

  const toggle = useCallback(() => {
    return setIsOpen(!debouncedIsOpen);
  }, [debouncedIsOpen]);

  useEffect(() => {
    let prevScrollPosition = 0;

    function handleScroll() {
      const currentScrollPosition = window.scrollY;

      const scrollAmount = Math.abs(currentScrollPosition - prevScrollPosition);

      const scrolledALot = scrollAmount > MIN_SCROLL_AMOUNT;
      if (isOpen && scrolledALot) {
        setIsOpen(false);
      }

      prevScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, setIsOpen]);

  return {
    isMenuHidden,
    isOpen,
    toggle,
  };
}
