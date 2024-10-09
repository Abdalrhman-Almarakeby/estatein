"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContextProvider } from "./toast";

type ProvidersProps = {
  children: ReactNode;
};

export function GlobalProviders({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastContextProvider>{children}</ToastContextProvider>;
    </SessionProvider>
  );
}
