import Image from "next/image";
import { toKebabCase } from "@/lib/utils";
import { Stars } from "./stars";

type TestimonialCardProps = {
  rating: number;
  title: string;
  body: string;
  name: string;
  location: string;
};

export function TestimonialCard({
  rating,
  title,
  body,
  name,
  location,
}: TestimonialCardProps) {
  const avatarImg = `/avatars/${toKebabCase(name)}.webp`;

  return (
    <div className="flex flex-col justify-between gap-6 rounded-xl border p-7.5 lg:gap-7.5 lg:p-10">
      <Stars num={rating} />
      <div className="space-y-2 lg:space-y-3">
        <p className="text-lg lg:text-xl 3xl:text-2xl">{title}</p>
        <p className="text-primary">{body}</p>
      </div>
      <div className="flex gap-2.5">
        <Image
          src={avatarImg}
          width={50}
          height={50}
          alt={`Avatar of ${name}`}
          loading="lazy"
          className="aspect-[1/1] size-[50px] rounded-full"
        />
        <p className="grid lg:text-lg">
          <span>{name}</span>
          <span className="text-primary">{location}</span>
        </p>
      </div>
    </div>
  );
}
