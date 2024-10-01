"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ToastContextType = {
  isToastShown: boolean;
  setIsToastShown: (shown: boolean) => void;
};

type ToastContextProviderProps = {
  children: ReactNode;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [isToastShown, setIsToastShown] = useState(false);

  return (
    <ToastContext.Provider value={{ isToastShown, setIsToastShown }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
}
