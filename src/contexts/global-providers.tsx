"use client";

import { ReactNode } from "react";
import { ToastContextProvider } from "./toast";

type ProvidersProps = {
  children: ReactNode;
};

export function GlobalProviders({ children }: ProvidersProps) {
  return <ToastContextProvider>{children}</ToastContextProvider>;
}
