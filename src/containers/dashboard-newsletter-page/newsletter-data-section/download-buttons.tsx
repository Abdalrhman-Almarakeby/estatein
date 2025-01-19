"use client";

import {
  Code,
  FileCode,
  FileSliders,
  FileSpreadsheet,
  FileText,
  FileType,
} from "lucide-react";
import {
  ExportFormat,
  exportSubscriberData,
  Subscribers,
} from "@/lib/export-subscribers";

type DownloadButtonsProps = {
  subscribers: Subscribers;
};

const FORMATS = [
  { format: "xlsx", Icon: FileSpreadsheet },
  { format: "csv", Icon: FileSliders },
  { format: "json", Icon: Code },
  { format: "xml", Icon: FileCode },
  { format: "pdf", Icon: FileText },
  { format: "txt", Icon: FileType },
] as const;

export function DownloadButtons({ subscribers }: DownloadButtonsProps) {
  const downloadSubscribers = async (format: ExportFormat) => {
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
