"use client";

import { NewsletterSubscriber } from "@prisma/client";
import {
  Code,
  FileCode,
  FileSliders,
  FileSpreadsheet,
  FileText,
  FileType,
} from "lucide-react";
import { StrictOmit, SVGComponent } from "@/types";
import {
  ExportFileFormat,
  ExportFileFormats,
  exportSubscriberData,
} from "@/lib/export-subscribers";

type DownloadButtonsProps = {
  subscribers: StrictOmit<NewsletterSubscriber, "id">[];
};

const FORMATS: {
  format: keyof typeof ExportFileFormats;
  Icon: SVGComponent;
}[] = [
  { format: "XLSX", Icon: FileSpreadsheet },
  { format: "CSV", Icon: FileSliders },
  { format: "JSON", Icon: Code },
  { format: "XML", Icon: FileCode },
  { format: "PDF", Icon: FileText },
  { format: "TXT", Icon: FileType },
] as const;

export function DownloadButtons({ subscribers }: DownloadButtonsProps) {
  const downloadSubscribers = async (format: ExportFileFormat) => {
    try {
      await exportSubscriberData(subscribers, format);
    } catch (error) {
      alert(
        "An error occurred while downloading subscribers. Please try again.",
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {FORMATS.map(({ format, Icon }) => (
        <button
          key={format}
          onClick={() => downloadSubscribers(format)}
          className="bg-primary btn-primary flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white"
        >
          <Icon className="size-4" />
          <span className="font-medium">{format.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
