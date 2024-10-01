type ListProps = {
  data: string[];
};

export function List({ data }: ListProps) {
  return (
    <ul className="mb-5 mt-2 list-outside list-disc space-y-3 *:ms-6">
      {data.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
