import Link from "next/link";
import { getYear } from "date-fns";
import { SocialMediaLinks } from "./social-media-links";

export function FooterInfo() {
  const year = getYear(new Date());

  return (
    <div className="bg-gray-darker py-5 text-center md:py-3">
      <div className="container flex flex-col md:flex-row md:items-center md:gap-5">
        <SocialMediaLinks />
        <small className="mb-2.5 text-base md:order-1 md:mb-0">
          @{year} Estatein. All Rights Reserved.
        </small>
        <p className="md:order-2">
          <Link href="/legal/terms-of-service">Terms Of Service</Link> &{" "}
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
