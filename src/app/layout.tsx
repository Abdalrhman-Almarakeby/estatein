import { ReactNode } from "react";
import { Providers } from "@/contexts/providers";
import "@/styles/global.css";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="relative overflow-x-clip bg-gray-darkest text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
