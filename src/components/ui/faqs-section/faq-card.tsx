import Link from "next/link";
import { cn, toKebabCase } from "@/lib/utils";

type FAQCardProps = {
  question: string;
  answer: string;
  className?: string;
};

export function FAQCard({ question, answer, className }: FAQCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 rounded-xl border p-7.5 lg:gap-6 lg:p-10",
        className,
      )}
      aria-labelledby={`faq-${toKebabCase(question)}`}
    >
      <h3
        id={`faq-${toKebabCase(question)}`}
        className="text-lg lg:text-xl 3xl:text-2xl"
      >
        {question}
      </h3>
      <p className="text-primary">{answer}</p>
      <Link
        href="/about#how-it-is-work"
        className="btn-tertiary btn-sm 3xl:btn-md text-center 3xl:text-lg"
        aria-label="See how it works for Estatein's services"
      >
        See How It Works
      </Link>
    </div>
  );
}
