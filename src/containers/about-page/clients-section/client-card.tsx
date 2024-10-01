import BlocksIconSVG from "@/assets/icons/blocks.svg";
import ThunderIconSVG from "@/assets/icons/thunder.svg";

type ClientCardProps = {
  date: number;
  name: string;
  websiteLink: string;
  domain: string;
  category: string;
  testimonial: string;
};

export function ClientCard({
  date,
  name,
  domain,
  category,
  websiteLink,
  testimonial,
}: ClientCardProps) {
  return (
    <div className="space-y-7.5 rounded-[10px] border p-6 shadow-[0_0_0_6px_#191919] lg:p-10 3xl:space-y-10 3xl:p-12.5">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-primary">Since {date}</p>
          <h2 className="text-xl font-semibold lg:text-2xl 3xl:text-3xl">
            {name}
          </h2>
        </div>
        <a
          href={websiteLink}
          target="_blank"
          rel="noreferrer"
          className="btn-tertiary btn-sm text-center"
          aria-label={`Visit ${name}'s website`}
        >
          Visit Website
        </a>
      </header>

      <div className="grid grid-cols-2">
        <div className="space-y-1 border-r pr-4">
          <p className="text-primary flex items-center gap-0.5 text-xs">
            <BlocksIconSVG aria-hidden="true" />
            Domain
          </p>
          <p className="text-secondary">{domain}</p>
        </div>
        <div className="space-y-1 pl-4">
          <p className="text-primary flex items-center gap-0.5 text-xs">
            <ThunderIconSVG aria-hidden="true" />
            Category
          </p>
          <p className="text-secondary">{category}</p>
        </div>
      </div>

      <footer className="space-y-2 rounded-xl border p-5">
        <p className="text-primary">What They Said 🤗</p>
        <p className="text-secondary">{testimonial}</p>
      </footer>
    </div>
  );
}
