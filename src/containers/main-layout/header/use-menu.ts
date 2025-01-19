import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce, useWindowWidth } from "@/hooks";
import { MOBILE_BREAKPOINT } from "@/constant";

const MIN_SCROLL_AMOUNT = 50;

export function useMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const debouncedIsOpen = useDebounce(isOpen);
  const windowWidth = useWindowWidth();

  const isMenuHidden = useMemo(() => {
    return windowWidth && windowWidth < MOBILE_BREAKPOINT && !isOpen;
  }, [isOpen, windowWidth]);

  const toggle = useCallback(() => {
    return setIsOpen(!debouncedIsOpen);
  }, [debouncedIsOpen]);

  useEffect(() => {
    let prevScrollPosition = window.scrollY;

    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      const scrollAmount = Math.abs(currentScrollPosition - prevScrollPosition);
      const hasScrolledSignificantly = scrollAmount > MIN_SCROLL_AMOUNT;

      if (isOpen && hasScrolledSignificantly) {
        setIsOpen(false);
      }

      prevScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return {
    isMenuHidden: !!isMenuHidden,
    isOpen,
    toggle,
  };
}
