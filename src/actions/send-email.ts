"use server";

import { ReactElement } from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { env } from "@/lib/env";

export async function sendEmail({
  to,
  subject,
  template,
}: {
  to: string;
  subject: string;
  template: ReactElement;
}): Promise<{ success: boolean; message: string }> {
  try {
    const htmlContent = await render(template);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.GMAIL_EMAIL,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: env.GMAIL_EMAIL,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const { rejected } = await transporter.sendMail(mailOptions);

    if (rejected.length) {
      return {
        success: false,
        message: "Email not sent. Please try again later.",
      };
    }

    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    return { success: false, message: "Failed to send email." };
  }
}
