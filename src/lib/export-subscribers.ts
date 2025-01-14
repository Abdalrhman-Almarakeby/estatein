import { NewsletterSubscriber } from "@prisma/client";
import { format } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Papa from "papaparse";

export type ExportFormat = "csv" | "xlsx" | "json" | "xml" | "txt" | "pdf";

export type Subscribers = Omit<NewsletterSubscriber, "id">[];

export async function exportSubscriberData(
  subscribers: Subscribers,
  format: ExportFormat,
) {
  switch (format) {
    case "csv":
      return exportCSV(subscribers);
    case "xlsx":
      return exportXLSX(subscribers);
    case "json":
      return exportJSON(subscribers);
    case "xml":
      return exportXML(subscribers);
    case "txt":
      return exportTXT(subscribers);
    case "pdf":
      return exportPDF(subscribers);
    default:
      throw new Error(`Unsupported format: ${format}`);
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
      subscribedAt: format(sub.subscribedAt, "P p"),
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
  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<subscribers>
  ${subscribers
    .map(
      (sub) => `
  <subscriber>
    <subscriberEmail>${sub.email}</subscriberEmail>
    <subscriptionDate>${format(sub.subscribedAt, "Pp")}</subscriptionDate>
  </subscriber>`,
    )
    .join("")}
</subscribers>`;

  const blob = new Blob([xmlString], {
    type: "application/xml;charset=utf-8;",
  });

  saveAs(blob, "newsletter_subscribers.xml");
}

function exportTXT(subscribers: Subscribers) {
  const txtString = subscribers
    .map((sub) => `${sub.email}, ${format(sub.subscribedAt, "Pp")}`)
    .join("\n");

  const blob = new Blob([txtString], { type: "text/plain;charset=utf-8;" });

  saveAs(blob, "newsletter_subscribers.txt");
}

function exportPDF(subscribers: Subscribers) {
  const doc = new jsPDF();
  doc.text("Newsletter Subscribers", 10, 10);

  subscribers.forEach((sub, index) => {
    doc.text(
      `${index + 1}. ${sub.email} - ${format(sub.subscribedAt, "Pp")}`,
      10,
      20 + index * 10,
    );
  });

  doc.save("newsletter_subscribers.pdf");
}
