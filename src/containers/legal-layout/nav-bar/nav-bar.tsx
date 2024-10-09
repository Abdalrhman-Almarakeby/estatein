import { toKebabCase } from "@/lib/utils";

type NavbarProps = {
  links: string[];
};

export function Navbar({ links }: NavbarProps) {
  return (
    <nav className="grid place-content-start gap-2 text-purple-light">
      {links.map((link) => (
        <a key={link} href={`#${toKebabCase(link)}`} className="py-1 pe-2">
          {link}
        </a>
      ))}
    </nav>
  );
}
