import AddBlockSVG from "@/assets/icons/add-block.svg";
import BadgesSVG from "@/assets/icons/badges.svg";
import StarsSVG from "@/assets/icons/stars.svg";
import SunSVG from "@/assets/icons/sun.svg";

export const PROPERTY_MANAGEMENT_SERVICES = [
  {
    title: "Tenant Harmony",
    paragraph:
      "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
    Icon: AddBlockSVG,
  },
  {
    title: "Maintenance Ease",
    paragraph:
      "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
    Icon: BadgesSVG,
  },
  {
    title: "Legal Guardian",
    paragraph:
      "Stay compliant with property laws and regulations effortlessly.",
    Icon: SunSVG,
  },
  {
    title: "Financial Peace of Mind",
    paragraph:
      "Managing property finances can be complex. Our financial experts take care of rent collection",
    Icon: StarsSVG,
  },
] as const;
