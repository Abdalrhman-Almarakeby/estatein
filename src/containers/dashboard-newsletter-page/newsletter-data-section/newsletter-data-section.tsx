import { NewsletterSubscriber } from "@prisma/client";
import { FileDown } from "lucide-react";
import { StrictOmit } from "@/types";
import { DownloadButtons } from "./download-buttons";

type NewsletterDataSectionProps = {
  subscribers: StrictOmit<NewsletterSubscriber, "id">[];
};

export function NewsletterDataSection({
  subscribers,
}: NewsletterDataSectionProps) {
  return (
    <section className="grid gap-8">
      <h2 className="text-xl font-bold">Subscriptions Data</h2>
      <div className="rounded-lg bg-gray-darker p-6 shadow-lg">
        <div className="mb-6 flex items-center">
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
