import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

type GrowthIndicatorProps = {
  value: number;
};

export function GrowthIndicator({ value }: GrowthIndicatorProps) {
  if (value > 0) {
    return <ArrowUpIcon className="inline size-4 text-green-500" />;
  }

  if (value < 0) {
    return <ArrowDownIcon className="inline size-4 text-red-500" />;
  }

  return null;
}
