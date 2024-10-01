import { ScrollDirection } from "@/types";

export function getScrollDirection(
  lastScrollPosition: number,
  lastScrollDirection: ScrollDirection,
): ScrollDirection {
  const newScrollDirection = scrollY > lastScrollPosition ? "down" : "up";
  const scrolledSignificantly =
    scrollY - lastScrollPosition > 15 || scrollY - lastScrollPosition < -5;
  const scrollDirectionChanged = lastScrollDirection !== newScrollDirection;

  return scrolledSignificantly && scrollDirectionChanged
    ? newScrollDirection
    : lastScrollDirection;
}
