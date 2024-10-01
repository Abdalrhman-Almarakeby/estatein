import BuildingsIconSVG from "@/assets/icons/buildings.svg";
import CashIconSVG from "@/assets/icons/cash.svg";
import HomeIconSVG from "@/assets/icons/home.svg";
import SunIconSVG from "@/assets/icons/sun.svg";

export const SERVICES_PAGE_LINKS_DATA = [
  {
    to: "/properties",
    Icon: HomeIconSVG,
    label: "Find Your Dream Home",
  },
  {
    to: "/properties",
    Icon: CashIconSVG,
    label: "Unlock Property Value",
  },
  {
    to: "/properties",
    Icon: BuildingsIconSVG,
    label: "Effortless Property Management",
  },
  {
    to: "/properties",
    Icon: SunIconSVG,
    label: "Smart Investments, Informed Decisions",
  },
] as const;
