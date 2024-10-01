import { cn } from "@/lib/utils";

type DisclaimerBoxProps = {
  className?: string;
};

export function DisclaimerBox({ className }: DisclaimerBoxProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-lg border bg-gray-darker px-5 py-6 xl:flex-row xl:items-center xl:px-10 xl:py-5 2xl:px-11 2xl:py-6 3xl:px-12.5 3xl:py-7.5",
        className,
      )}
    >
      <p className="text-lg font-semibold lg:text-xl xl:border-r xl:pr-4 2xl:pr-5 2xl:text-[1.375rem] 3xl:text-2xl">
        Note:
      </p>
      <hr className="xl:hidden" />
      <p className="text-primary xl:pl-4 2xl:pl-5">
        The figures provided above are estimates and may vary depending on the
        property, location, and individual circumstances.
      </p>
    </div>
  );
}
