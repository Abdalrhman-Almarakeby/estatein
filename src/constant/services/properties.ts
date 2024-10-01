import DataChartSVG from "@/assets/icons/data-chart.svg";
import DataSVG from "@/assets/icons/data.svg";
import HornSVG from "@/assets/icons/horn.svg";
import StackSVG from "@/assets/icons/stack.svg";

export const PROPERTIES_SERVICES = [
  {
    Icon: DataSVG,
    title: "Valuation Mastery",
    paragraph:
      "Discover the true worth of your property with our expert valuation services.",
  },
  {
    Icon: DataChartSVG,
    title: "Strategic Marketing",
    paragraph:
      "Selling a property requires more than just a listing; it demands a strategic marketing.",
  },
  {
    Icon: StackSVG,
    title: "Negotiation Wizardry",
    paragraph:
      "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
  },
  {
    Icon: HornSVG,
    title: "Closing Success",
    paragraph:
      "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
  },
] as const;
