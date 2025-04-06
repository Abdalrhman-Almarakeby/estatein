import Script from "next/script";
import { ReactNode } from "react";
import { GlobalProviders } from "@/contexts/global-providers";
import { env } from "@/lib/env";
import "@/styles/global.css";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="relative overflow-x-clip bg-gray-darkest text-white [&_.grecaptcha-badge]:invisible [&_.grecaptcha-badge]:opacity-0">
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        ></Script>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
