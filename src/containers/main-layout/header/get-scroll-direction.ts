import { ScrollDirection } from "@/types";

const SIGNIFICANT_SCROLL_UP = -5;
const SIGNIFICANT_SCROLL_DOWN = 15;

export function getScrollDirection(
  lastScrollPosition: number,
  lastScrollDirection: ScrollDirection,
): ScrollDirection {
  const scrollDelta = scrollY - lastScrollPosition;
  const newScrollDirection = scrollDelta > 0 ? "down" : "up";
  const scrolledSignificantly =
    scrollDelta > SIGNIFICANT_SCROLL_DOWN ||
    scrollDelta < SIGNIFICANT_SCROLL_UP;
  const scrollDirectionChanged = lastScrollDirection !== newScrollDirection;

  return scrolledSignificantly && scrollDirectionChanged
    ? newScrollDirection
    : lastScrollDirection;
}
