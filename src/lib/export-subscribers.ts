import { NewsletterSubscriber } from "@prisma/client";
import { format } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Papa from "papaparse";
import { StrictOmit } from "@/types";

export const ExportFileFormats = {
  CSV: "CSV",
  XLSX: "XLSX",
  JSON: "JSON",
  XML: "XML",
  TXT: "TXT",
  PDF: "PDF",
} as const;

export type ExportFileFormat = keyof typeof ExportFileFormats;

export type Subscribers = (StrictOmit<
  NewsletterSubscriber,
  "id" | "subscribedAt"
> & {
  subscribedAt: string;
})[];

export async function exportSubscriberData(
  subscribers: StrictOmit<NewsletterSubscriber, "id">[],
  fileFormat: ExportFileFormat,
) {
  const formattedSubscribers = subscribers.map((sub) => ({
    ...sub,
    subscribedAt: format(sub.subscribedAt, "Pp"),
  }));

  switch (fileFormat) {
    case ExportFileFormats.CSV:
      return exportCSV(formattedSubscribers);
    case ExportFileFormats.XLSX:
      return exportXLSX(formattedSubscribers);
    case ExportFileFormats.JSON:
      return exportJSON(formattedSubscribers);
    case ExportFileFormats.XML:
      return exportXML(formattedSubscribers);
    case ExportFileFormats.TXT:
      return exportTXT(formattedSubscribers);
    case ExportFileFormats.PDF:
      return exportPDF(formattedSubscribers);
    default:
      throw new Error(`Unsupported format: ${fileFormat}`);
  }
}

function exportCSV(subscribers: Subscribers) {
  const csv = Papa.unparse(subscribers);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  saveAs(blob, "newsletter_subscribers.csv");
}

async function exportXLSX(subscribers: Subscribers) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Subscribers");

  worksheet.columns = [
    { header: "Email Address", key: "email" },
    { header: "Subscription Date", key: "subscribedAt" },
  ];

  subscribers.forEach((sub) => {
    worksheet.addRow({
      email: sub.email,
      subscribedAt: sub.subscribedAt,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "newsletter_subscribers.xlsx");
}

function exportJSON(subscribers: Subscribers) {
  const jsonString = JSON.stringify(subscribers, null, 2);
  const blob = new Blob([jsonString], {
    type: "application/json;charset=utf-8;",
  });

  saveAs(blob, "newsletter_subscribers.json");
}

function exportXML(subscribers: Subscribers) {
  const xmlContent = subscribers
    .map(
      (sub) => /*XML*/ `  
  <subscriber>
    <subscriberEmail>${sub.email}</subscriberEmail>
    <subscriptionDate>${sub.subscribedAt}</subscriptionDate>
  </subscriber>`,
    )
    .join("");

  const xmlString = /*XML*/ `<?xml version="1.0" encoding="UTF-8"?>
<subscribers>${xmlContent}</subscribers>`;

  const blob = new Blob([xmlString], {
    type: "application/xml;charset=utf-8;",
  });

  saveAs(blob, "newsletter_subscribers.xml");
}

function exportTXT(subscribers: Subscribers) {
  const txtContent = subscribers
    .map((sub) => `${sub.email}, ${sub.subscribedAt}`)
    .join("\n");

  const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8;" });

  saveAs(blob, "newsletter_subscribers.txt");
}

function exportPDF(subscribers: Subscribers) {
  const doc = new jsPDF();
  doc.text("Newsletter Subscribers", 10, 10);

  subscribers.forEach((sub, index) => {
    doc.text(
      `${index + 1}. ${sub.email} - ${sub.subscribedAt}`,
      10,
      20 + index * 10,
    );
  });

  doc.save("newsletter_subscribers.pdf");
}
