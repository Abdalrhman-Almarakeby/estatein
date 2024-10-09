"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
