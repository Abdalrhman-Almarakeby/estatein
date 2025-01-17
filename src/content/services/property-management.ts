import { Grid2x2Plus, Sun, SwatchBook } from "lucide-react";
import StarsSVG from "@/assets/stars.svg";

export const PROPERTY_MANAGEMENT_SERVICES = [
  {
    title: "Tenant Harmony",
    paragraph:
      "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
    Icon: Grid2x2Plus,
  },
  {
    title: "Maintenance Ease",
    paragraph:
      "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
    Icon: SwatchBook,
  },
  {
    title: "Legal Guardian",
    paragraph:
      "Stay compliant with property laws and regulations effortlessly.",
    Icon: Sun,
  },
  {
    title: "Financial Peace of Mind",
    paragraph:
      "Managing property finances can be complex. Our financial experts take care of rent collection",
    Icon: StarsSVG,
  },
] as const;
