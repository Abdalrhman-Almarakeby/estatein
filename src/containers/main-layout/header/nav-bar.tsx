import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg?url";

type NavBarProps = {
  isOpen: boolean;
  isMenuHidden: boolean;
  toggle: () => void;
};

export function NavBar({ isOpen, isMenuHidden, toggle }: NavBarProps) {
  const pathname = usePathname();

  return (
    <>
      <Image
        src={logo}
        alt="Logo of Estatein, consisting of a purple abstract geometric shape that suggests a dynamic, folded form, set against a black background."
        className="w-[100px] md:sr-only"
        aria-hidden="true"
      />
      <nav
        id="main-menu"
        role="menu"
        aria-label="Main menu"
        aria-hidden={isMenuHidden}
        className={cn(
          "absolute top-0 z-50 flex h-dvh w-svw flex-col items-center gap-5 self-stretch pt-20 text-3xl backdrop-blur-md md:static md:flex md:size-auto md:flex-row md:gap-1 md:pt-0 md:text-base md:backdrop-blur-none 2xl:gap-1.5",
          isOpen
            ? "right-0 flex motion-safe:animate-menu-open"
            : "-right-[110%] hidden motion-safe:animate-menu-close",
        )}
      >
        <Link
          href="/#"
          className="mr-auto hidden w-[100px] md:block lg:w-[110px] xl:w-[130px] 2xl:w-[160px]"
          role="menuitem"
        >
          <Image
            src={logo}
            alt="Logo of Estatein, consisting of a purple abstract geometric shape that suggests a dynamic, folded form, set against a black background."
          />
        </Link>
        <Link
          onClick={() => isOpen && toggle()}
          href="/#"
          role="menuitem"
          className={cn(
            "rounded-[0.625rem] border border-transparent px-5 py-3 !no-underline transition duration-300 2xl:px-6 2xl:py-3.5",
            pathname === "/" && "md:border-gray-dark md:bg-gray-darkest",
          )}
        >
          Home
        </Link>
        <Link
          onClick={() => isOpen && toggle()}
          href="/about#"
          role="menuitem"
          className={cn(
            "rounded-[0.625rem] border border-transparent px-5 py-3 !no-underline transition duration-300 2xl:px-6 2xl:py-3.5",
            pathname === "/about" && "md:border-gray-dark md:bg-gray-darkest",
          )}
        >
          About Us
        </Link>
        <Link
          onClick={() => isOpen && toggle()}
          href="/properties#"
          role="menuitem"
          className={cn(
            "rounded-[0.625rem] border border-transparent px-5 py-3 !no-underline transition duration-300 2xl:px-6 2xl:py-3.5",
            pathname === "/properties" &&
              "md:border-gray-dark md:bg-gray-darkest",
          )}
        >
          Properties
        </Link>
        <Link
          onClick={() => isOpen && toggle()}
          href="/services#"
          role="menuitem"
          className={cn(
            "rounded-[0.625rem] border border-transparent px-5 py-3 !no-underline transition duration-300 2xl:px-6 2xl:py-3.5",
            pathname === "/services" &&
              "md:border-gray-dark md:bg-gray-darkest",
          )}
        >
          Services
        </Link>
        <Link
          onClick={() => isOpen && toggle()}
          href="/contact#"
          role="menuitem"
          className="rounded-[0.625rem] px-5 py-3 !no-underline md:ml-auto md:border md:border-gray-dark md:bg-gray-darkest 2xl:px-6 2xl:py-3.5"
        >
          Contact Us
        </Link>
      </nav>
    </>
  );
}
