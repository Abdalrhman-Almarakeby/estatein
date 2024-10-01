import { ReactNode } from "react";
import "@/styles/global.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
