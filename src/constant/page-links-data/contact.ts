import LocationIconSVG from "@/assets/icons/location.svg";
import MailIconSVG from "@/assets/icons/mail.svg";
import PhoneIconsSVG from "@/assets/icons/phone.svg";
import FacebookIconSVG from "@/assets/socialmedia/facebook.svg";

export const CONTACT_PAGE_LINKS_DATA = [
  {
    to: "mailto:info@estatein.com",
    Icon: MailIconSVG,
    label: "info@estatein.com",
    ariaLabel: "Estatein Email Address",
  },
  {
    to: "tel:+1 (123) 456-7890",
    Icon: PhoneIconsSVG,
    label: "+1 (123) 456-7890",
    ariaLabel: "Estatein Phone Number",
  },
  {
    to: "https://maps.google.com",
    Icon: LocationIconSVG,
    label: "Main Headquarters",
    target: "_blank",
    ariaLabel: "Estatein Main Headquarters Location",
  },
  {
    to: "https://facebook.com",
    Icon: FacebookIconSVG,
    label: "Facebook",
    target: "_blank",
    ariaLabel: "Estatein Facebook Page",
  },
] as const;
