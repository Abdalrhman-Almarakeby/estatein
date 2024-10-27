import { Loader, Loader2 } from "lucide-react";

export function DashboardAuthLoading() {
  return (
    <div className="p-5">
      <Loader2 className="mx-auto hidden size-14 animate-spin motion-safe:block" />
      <Loader className="mx-auto block size-12 motion-safe:hidden" />
    </div>
  );
}
