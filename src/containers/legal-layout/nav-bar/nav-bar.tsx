import { toKebabCase } from "@/lib/utils";

type NavbarProps = {
  links: string[];
};

export function Navbar({ links }: NavbarProps) {
  return (
    <nav className="mb-14 space-y-2 text-purple-medium">
      {links.map((link) => (
        <a key={link} href={`#${toKebabCase(link)}`}>
          {link}
        </a>
      ))}
    </nav>
  );
}
