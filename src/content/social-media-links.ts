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
    href: "https://github.com/Abdalrhman-Almarakeby",
    Icon: SiFacebook,
    name: "Facebook",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby",
    Icon: SiLinkedin,
    name: "Linkedin",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby",
    Icon: SiX,
    name: "X",
  },
  {
    href: "https://github.com/Abdalrhman-Almarakeby",
    Icon: SiYoutube,
    name: "Youtube",
  },
] as const;
