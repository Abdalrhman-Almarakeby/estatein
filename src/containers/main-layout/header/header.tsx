import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
          {isOpen ? (
            <>
              <X className="size-8" />
              <span className="sr-only">Close menu.</span>
            </>
          ) : (
            <>
              <Menu className="size-8" />
              <span className="sr-only">Open menu.</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
