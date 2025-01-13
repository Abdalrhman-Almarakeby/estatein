import { FileDown } from "lucide-react";
import { Subscribers } from "@/lib/export-subscribers";
import { DownloadButtons } from "./download-buttons";

type NewsletterDataSectionProps = {
  subscribers: Subscribers;
};

export function NewsletterDataSection({
  subscribers,
}: NewsletterDataSectionProps) {
  return (
    <section className="grid gap-8">
      <h2 className="text-xl font-bold">Subscription Data</h2>
      <div className="bg-gray-darker rounded-lg p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <FileDown className="text-primary mr-2 size-6" />
          <p className="text-primary text-xl font-semibold">
            Export Newsletter Subscribers
          </p>
        </div>
        <DownloadButtons subscribers={subscribers} />
      </div>
    </section>
  );
}
