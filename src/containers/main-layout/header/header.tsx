import Image from "next/image";
import { cn } from "@/lib/utils";
import burgerIcon from "@/assets/icons/burger-menu.svg?url";
import xIcon from "@/assets/icons/x-mark.svg?url";
import { NavBar } from "./nav-bar";
import { useMenu } from "./use-menu";

type HeaderProps = {
  showHeader: boolean;
};

export function Header({ showHeader }: HeaderProps) {
  const { isOpen, toggle, isMenuHidden } = useMenu();

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-40 w-full border-y border-y-gray-dark bg-gray-darker text-sm text-white transition-[top] duration-300 md:static md:py-5 2xl:text-lg",
        !showHeader && "-top-full md:top-0",
      )}
    >
      <div className="container flex items-center justify-between md:block">
        <NavBar isMenuHidden={isMenuHidden} isOpen={isOpen} toggle={toggle} />
        <button
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label="Toggle menu"
          onClick={toggle}
          className="z-[99999] py-5 pl-5 md:hidden"
        >
          <Image
            src={isOpen ? xIcon : burgerIcon}
            alt={
              isOpen
                ? "Close navigation menu."
                : "Menu icon consisting of three horizontal white lines on a black background, which opens the navigation menu when clicked."
            }
            className="size-10"
          />
          <span className="sr-only">{isOpen ? "Close Menu" : "Open Menu"}</span>
        </button>
      </div>
    </header>
  );
}
