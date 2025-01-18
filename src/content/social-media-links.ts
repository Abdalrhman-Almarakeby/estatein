import { ElementType } from "react";
import {
  SiFacebook,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export const SOCIAL_LINKS: {
  href: string;
  Icon: ElementType;
  name: string;
}[] = [
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: SiFacebook,
    name: "Facebook",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: SiLinkedin,
    name: "Linkedin",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: SiX,
    name: "X",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby/estatein-frontend/",
    Icon: SiYoutube,
    name: "Youtube",
  },
] as const;
