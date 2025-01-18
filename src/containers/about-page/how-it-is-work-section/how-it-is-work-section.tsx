import { Section, SectionTitle } from "@/components/ui/section";
import { HOW_IT_IS_WORK } from "@/content";

export function HowItIsWorkSection() {
  return (
    <Section id="how-it-is-work">
      <SectionTitle
        title="Navigating the Estatein Experience"
        paragraph="At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
      />
      <div className="grid gap-7.5 md:grid-cols-2 xl:grid-cols-3">
        {HOW_IT_IS_WORK.map(({ title, paragraph }, i) => (
          <article
            key={title}
            className="flex flex-col"
            aria-labelledby={`step-${i}`}
          >
            <p className="border border-b-0 border-l-purple-base px-4 py-3.5 lg:text-lg 3xl:text-xl">
              Step {i + 1}
            </p>
            <div className="flex grow flex-col gap-3.5 border border-l border-l-purple-base p-7.5">
              <h4
                id={`step-${i}`}
                className="text-lg font-semibold lg:text-lg 3xl:text-[1.625rem]"
              >
                {title}
              </h4>
              <p className="text-primary">{paragraph}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
