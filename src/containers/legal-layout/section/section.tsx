import { toKebabCase } from "@/lib/utils";
import { List } from "./list";

type SectionProps = {
  title: string;
  content: (string | string[])[];
};

export function Section({ title, content }: SectionProps) {
  const sectionId = toKebabCase(title);

  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-title`}>
      <h2
        className="mb-4 text-2xl font-semibold text-white"
        id={`${sectionId}-title`}
      >
        {title}
      </h2>
      {content.map((item) =>
        Array.isArray(item) ? (
          <List data={item} key={item[0]} />
        ) : (
          <p key={item}>{item}</p>
        ),
      )}
    </section>
  );
}
