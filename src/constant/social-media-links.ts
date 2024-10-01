import { ElementType } from "react";
import FacebookLogoSVG from "@/assets/socialmedia/facebook.svg";
import LinkedinLogoSVG from "@/assets/socialmedia/linkedin.svg";
import XLogoSVG from "@/assets/socialmedia/x-twitter.svg";
import YoutubeLogoSVG from "@/assets/socialmedia/youtube.svg";

export const SOCIAL_LINKS: {
  href: string;
  Icon: ElementType;
  name: string;
}[] = [
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: FacebookLogoSVG,
    name: "Facebook",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: LinkedinLogoSVG,
    name: "Linkedin",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: XLogoSVG,
    name: "X",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: YoutubeLogoSVG,
    name: "Youtube",
  },
] as const;
