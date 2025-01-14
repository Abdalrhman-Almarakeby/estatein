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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {FORMATS.map(({ format, Icon }) => (
        <button
          key={format}
          onClick={() => downloadSubscribers(format)}
          className="flex items-center justify-center px-4 py-2 bg-primary btn-primary text-white gap-2 rounded-md"
        >
          <Icon className="size-4" />
          <span className="font-medium">{format.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
