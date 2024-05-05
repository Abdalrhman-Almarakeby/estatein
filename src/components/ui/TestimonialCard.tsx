import { testimonial } from "@/lib/types/testimonial";
import StarSVG from "@/assets/icons/star.svg?react";

type TestimonialCardProps = testimonial;

export function TestimonialCard({
  rating,
  title,
  body,
  name,
  location,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-xl border p-7.5 lg:gap-7.5 lg:p-10">
      <div className="flex gap-2">
        {Array.from({ length: rating }).map((_, index) => (
          <span
            key={index}
            className="grid size-7.5 place-items-center rounded-full border bg-gray-10 lg:size-9"
          >
            <StarSVG className="lg:size-5" />
          </span>
        ))}
      </div>
      <div className="space-y-2 lg:space-y-3">
        <p className="text-lg lg:text-xl 3xl:text-2xl">{title}</p>
        <p className="text-primary">{body}</p>
      </div>
      <div className="flex gap-2.5">
        <img
          src={`/estatein-frontend/${avatar}`}
          aria-hidden="true"
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