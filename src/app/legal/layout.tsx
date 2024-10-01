import { ReactNode } from "react";
import { Footer } from "@/containers/legal-layout/footer/footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="text-primary min-h-screen bg-gray-darkest text-gray-light">
      {children}
      <Footer />
    </div>
  );
}
