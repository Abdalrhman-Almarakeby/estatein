"use client";

import { ReactNode, createContext, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, UseFormWatch, useForm } from "react-hook-form";
import { PropertiesFilters, propertiesFiltersZodSchema } from "@/lib/schemas";

type PropertiesFiltersContext = {
  watch: UseFormWatch<PropertiesFilters>;
  control: Control<PropertiesFilters>;
};

type PropertiesFiltersProviderProps = {
  children: ReactNode;
};

const PropertiesFiltersContext = createContext<PropertiesFiltersContext | null>(
  null,
);

export function usePropertiesFilters() {
  const context = useContext(PropertiesFiltersContext);

  if (!context) {
    throw new Error(
      "usePropertiesFilters must be used within a PropertiesFiltersProvider",
    );
  }

  return context;
}

export function PropertiesFiltersProvider({
  children,
}: PropertiesFiltersProviderProps) {
  const { control, watch } = useForm<PropertiesFilters>({
    resolver: zodResolver(propertiesFiltersZodSchema),
  });

  return (
    <PropertiesFiltersContext.Provider value={{ watch, control }}>
      {children}
    </PropertiesFiltersContext.Provider>
  );
}
