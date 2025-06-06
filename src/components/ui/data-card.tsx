import { IconContainer } from "@/components/ui/icon-container";
import { SVGComponent } from "@/types";
import { cn } from "@/lib/utils";

type DataCardProps = {
  title: string;
  paragraph: string;
  Icon?: SVGComponent;
  className?: string;
};

export function DataCard({ title, paragraph, Icon, className }: DataCardProps) {
  return (
    <div
      className={cn(
        "grid gap-4 rounded-[0.625rem] border p-6 lg:gap-5 lg:p-10 3xl:gap-7.5 3xl:px-12.5 3xl:py-10",
        className,
      )}
      aria-labelledby={`${title}-heading`}
    >
      {Icon ? (
        <div className={cn("flex items-center gap-2.5 lg:gap-4 3xl:gap-6")}>
          <IconContainer Icon={Icon} />
          <h3
            id={`${title}-heading`}
            className="text-lg font-semibold lg:text-xl 3xl:text-2xl"
          >
            {title}
          </h3>
        </div>
      ) : (
        <h3
          id={`${title}-heading`}
          className="text-lg font-semibold lg:text-xl 3xl:text-2xl"
        >
          {title}
        </h3>
      )}
      <p className="text-primary">{paragraph}</p>
    </div>
  );
}
