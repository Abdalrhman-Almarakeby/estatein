import { ReactNode } from "react";
import { Footer } from "@/containers/main-layout/footer";
import { Header } from "@/containers/main-layout/header";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col pt-[82px] md:p-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
