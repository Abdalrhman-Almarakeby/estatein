import ThunderSVG from "@/assets/icons/thunder.svg";

type FeatureProps = {
  children: string;
};

export function Feature({ children }: FeatureProps) {
  return (
    <div className="flex items-center gap-2.5 border-l border-purple-base bg-gradient-1 px-3 py-2.5">
      <div>
        <ThunderSVG className="size-4.5 [&_*]:!fill-white [&_*]:!stroke-white" />
      </div>
      <p>{children}</p>
    </div>
  );
}
