import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg?url";
import { FooterInfo } from "./footer-info";
import { FooterNav } from "./footer-nav";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-t-gray-dark bg-gray-darkest text-sm text-white lg:text-base">
      <div className="container flex flex-col space-y-12.5 py-12.5 md:py-8 xl:flex-row xl:gap-20 xl:space-y-0 2xl:py-20">
        <div className="space-y-7">
          <Link href="/#hero">
            <Image
              loading="lazy"
              src={logo}
              alt="Logo of Estatein, consisting of a purple abstract geometric shape that suggests a dynamic, folded form, set against a black background."
              className="w-[100px]"
            />
          </Link>
          <NewsletterForm />
        </div>
        <FooterNav />
      </div>
      <FooterInfo />
    </footer>
  );
}
