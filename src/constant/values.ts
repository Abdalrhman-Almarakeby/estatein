import AcademicCapSVG from "@/assets/icons/academic-cap.svg";
import StarSVG from "@/assets/icons/star.svg";
import UsersSVG from "@/assets/icons/users.svg";

export const VALUES = [
  {
    title: "Trust",
    paragraph:
      "Trust is the cornerstone of every successful real estate transaction.",
    Icon: StarSVG,
  },
  {
    title: "Excellence",
    paragraph:
      "We set the bar high for ourselves. From the properties we list to the services we provide.",
    Icon: AcademicCapSVG,
  },
  {
    title: "Client-Centric",
    paragraph:
      "Your dreams and needs are at the center of our universe. We listen, understand.",
    Icon: UsersSVG,
  },
  {
    title: "Our Commitment",
    paragraph:
      "We are dedicated to providing you with the highest level of service, professionalism",
    Icon: StarSVG,
  },
] as const;
