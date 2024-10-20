import {
  ChartNoAxesColumnIncreasing,
  ChartPie,
  CircleCheckBig,
  Database,
} from "lucide-react";

export const PROPERTIES_SERVICES = [
  {
    Icon: ChartNoAxesColumnIncreasing,
    title: "Valuation Mastery",
    paragraph:
      "Discover the true worth of your property with our expert valuation services.",
  },
  {
    Icon: ChartPie,
    title: "Strategic Marketing",
    paragraph:
      "Selling a property requires more than just a listing; it demands a strategic marketing.",
  },
  {
    Icon: Database,
    title: "Negotiation Wizardry",
    paragraph:
      "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
  },
  {
    Icon: CircleCheckBig,
    title: "Closing Success",
    paragraph:
      "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
  },
] as const;
