"use client";

import { Toaster } from "react-hot-toast";
import { Header } from "./header";
import { useShowHeader } from "./use-show-header";

export function HeaderWrapper() {
  const showHeader = useShowHeader();

  return (
    <>
      <Toaster
        toastOptions={{ className: "toast" }}
        containerClassName="fixed bottom-5 left-5 right-5 top-5"
      />
      <Header showHeader={showHeader} />
    </>
  );
}
