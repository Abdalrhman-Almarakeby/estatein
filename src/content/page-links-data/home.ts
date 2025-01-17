import { Banknote, Building2, House, Sun } from "lucide-react";

export const HOME_PAGE_LINKS_DATA = [
  {
    to: "/properties",
    Icon: House,
    label: "Find Your Dream Home",
  },
  {
    to: "/properties",
    Icon: Banknote,
    label: "Unlock Property Value",
  },
  {
    to: "/properties",
    Icon: Building2,
    label: "Effortless Property Management",
  },
  {
    to: "/properties",
    Icon: Sun,
    label: "Smart Investments, Informed Decisions",
  },
] as const;
