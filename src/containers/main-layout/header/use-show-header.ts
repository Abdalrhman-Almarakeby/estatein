import { useEffect, useMemo, useState } from "react";
import { useToastContext } from "@/contexts/toast";
import { ScrollDirection } from "@/types";
import { useWindowSize } from "@/hooks";
import { getScrollDirection } from "./get-scroll-direction";

const MAX_TOP_POSITION = 100;

export function useShowHeader() {
  const [isOnTop, setIsOnTop] = useState(true);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection | null>(null);
  const windowSize = useWindowSize();
  const { isToastShown } = useToastContext();

  const isSmallScreen = useMemo(
    () => windowSize.width < 768,
    [windowSize.width],
  );

  useEffect(() => {
    let lastScrollPosition = window.scrollY;

    function handleScroll() {
      if (!isSmallScreen) return;

      setIsOnTop(window.scrollY < MAX_TOP_POSITION);
      setScrollDirection(
        getScrollDirection(lastScrollPosition, scrollDirection || "up"),
      );

      lastScrollPosition = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSmallScreen, scrollDirection]);

  const showHeader = useMemo(() => {
    return (
      isSmallScreen && !isToastShown && (scrollDirection === "up" || isOnTop)
    );
  }, [isSmallScreen, isToastShown, scrollDirection, isOnTop]);

  return showHeader;
}
