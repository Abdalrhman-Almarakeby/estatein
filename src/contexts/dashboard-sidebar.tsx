"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DashboardSidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

type DashboardSidebarContextProviderProps = {
  children: ReactNode;
};

const dashboardSidebarContext =
  createContext<DashboardSidebarContextType | null>(null);

export function DashboardSidebarContextProvider({
  children,
}: DashboardSidebarContextProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <dashboardSidebarContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </dashboardSidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const context = useContext(dashboardSidebarContext);

  if (!context) {
    throw new Error(
      "useDashboardSidebar must be used within a DashboardSidebarContextProvider",
    );
  }

  return context;
}
