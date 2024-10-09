import { ReactNode } from "react";
import { GlobalProviders } from "@/contexts/global-providers";
import "@/styles/global.css";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="relative overflow-x-clip bg-gray-darkest text-white">
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
