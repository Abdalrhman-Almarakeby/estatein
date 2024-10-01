import Link from "next/link";
import { cn } from "@/lib/utils";

type FooterLinksProps = {
  pageName: string;
  children: React.ReactElement<typeof Link>[];
  className?: string;
};

export function FooterLinks({
  pageName,
  children,
  className,
}: FooterLinksProps) {
  return (
    <nav
      aria-label={`${pageName} Page Links`}
      className={cn(
        "flex flex-col border-b pb-5 lg:order-none lg:border-none lg:p-0 [&>*:nth-child(1)]:mb-2 [&>*:nth-child(1)]:text-gray-light [&>*]:py-1 2xl:[&>*]:py-2",
        className,
      )}
    >
      {children}
    </nav>
  );
}
