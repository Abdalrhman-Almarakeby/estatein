import { cn } from "@/lib/utils";

type HeaderSectionProps = {
  title: string;
  paragraph: string;
  className?: string;
};

export function HeaderSection({
  title,
  paragraph,
  className,
}: HeaderSectionProps) {
  return (
    <section
      role="banner"
      aria-labelledby="header-title"
      className={cn(
        "mx-break-out px-break-out bg-gradient-to-l from-transparent from-55% to-gray-dark",
        className,
      )}
    >
      <div className="container space-y-2.5 py-12.5 lg:py-24 3xl:space-y-3.5 3xl:py-36">
        <h1 id="header-title" className="h-primary">
          {title}
        </h1>
        <p className="text-primary">{paragraph}</p>
      </div>
    </section>
  );
}
