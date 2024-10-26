import { SiFacebook } from "@icons-pack/react-simple-icons";
import { Mail, MapPin, Phone } from "lucide-react";

export const CONTACT_PAGE_LINKS_DATA = [
  {
    to: "mailto:info@estatein.com",
    Icon: Mail,
    label: "info@estatein.com",
    ariaLabel: "Estatein Email Address",
  },
  {
    to: "tel:+1 (123) 456-7890",
    Icon: Phone,
    label: "+1 (123) 456-7890",
    ariaLabel: "Estatein Phone Number",
  },
  {
    to: "https://maps.google.com",
    Icon: MapPin,
    label: "Main Headquarters",
    target: "_blank",
    ariaLabel: "Estatein Main Headquarters Location",
  },
  {
    to: "https://facebook.com",
    Icon: SiFacebook,
    iconProps: { className: "fill-purple-light" },
    label: "Facebook",
    target: "_blank",
    ariaLabel: "Estatein Facebook Page",
  },
] as const;
