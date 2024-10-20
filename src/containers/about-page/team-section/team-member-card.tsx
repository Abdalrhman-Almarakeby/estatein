import { Route } from "next";
import Image from "next/image";
import { SiX } from "@icons-pack/react-simple-icons";
import { toKebabCase } from "@/lib/utils";

type TeamMemberCardProps = {
  twitterLink: Route;
  name: string;
  role: string;
};

export function TeamMemberCard({
  name,
  role,
  twitterLink,
}: TeamMemberCardProps) {
  const img = `/team/${toKebabCase(name)}.webp`;

  return (
    <div className="flex flex-col gap-10 rounded-xl border p-5 text-center lg:gap-12.5 lg:p-6 3xl:gap-12.5 3xl:p-7.5">
      <div className="relative">
        <Image
          src={img}
          width={400}
          height={318}
          alt={`Portrait of ${name}`}
          loading="lazy"
          className="aspect-[400/318] w-full rounded-2xl"
        />
        <a
          href={twitterLink}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-0 left-1/2 grid h-10 w-15 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-purple-base"
          aria-label={`Follow ${name} on Twitter`}
        >
          <SiX className="size-5 fill-white" />
        </a>
      </div>
      <div className="space-y-2">
        <h3 className="text-secondary text-lg font-semibold lg:text-xl 3xl:text-2xl">
          {name}
        </h3>
        <p className="text-primary">{role}</p>
      </div>
    </div>
  );
}
