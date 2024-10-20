import { SOCIAL_LINKS } from "@/constant";
import { cn } from "@/lib/utils";

type SocialMediaLinksProps = {
  className?: string;
};

export function SocialMediaLinks({ className }: SocialMediaLinksProps) {
  return (
    <div
      className={cn(
        "mb-5 flex justify-center gap-2 md:order-3 md:mb-0 md:ml-auto",
        className,
      )}
    >
      {SOCIAL_LINKS.map(({ href, name, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          role="link"
          rel="noopener noreferrer"
          title={`Find Us On ${name}`}
          aria-label={`${name} link`}
          className="grid size-[40px] place-items-center rounded-full bg-gray-darkest"
        >
          <Icon className="size-5 fill-white" />
          <span className="sr-only">{name}</span>
        </a>
      ))}
    </div>
  );
}
