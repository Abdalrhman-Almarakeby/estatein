"use client";

import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { usePropertiesFilters } from "@/contexts/properties-filters";
import { FILTERING_DATA } from "@/constant";

export function FiltersForm() {
  const { control } = usePropertiesFilters();

  return (
    <form className="grid gap-5 rounded-xl border bg-gray-darker p-5 sm:!-mt-[20px] sm:grid-cols-2 lg:grid-cols-4">
      {FILTERING_DATA.map(({ Icon, name, options }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          defaultValue="default"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                aria-label={`Filter by ${name}`}
                ref={field.ref}
                className="bg-gray-darkest"
              >
                <SelectValue
                  placeholder={
                    <span className="flex items-center gap-2 text-gray-light">
                      <Icon aria-hidden="true" className="size-4" />
                      {name}
                    </span>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      ))}
    </form>
  );
}
