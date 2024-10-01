import DataSVG from "@/assets/icons/data.svg";
import FireSVG from "@/assets/icons/fire.svg";
import LightBulbSVG from "@/assets/icons/light-bulb.svg";
import SunSVG from "@/assets/icons/sun.svg";

export const INVESTMENT_SERVICES_DATA = [
  {
    Icon: DataSVG,
    title: "Market Insight",
    paragraph:
      "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions",
  },
  {
    Icon: FireSVG,
    title: "ROI Assessment",
    paragraph:
      "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments",
  },
  {
    Icon: LightBulbSVG,
    title: "Customized Strategies",
    paragraph:
      "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs",
  },
  {
    Icon: SunSVG,
    title: "Diversification Mastery",
    paragraph:
      "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations",
  },
] as const;
