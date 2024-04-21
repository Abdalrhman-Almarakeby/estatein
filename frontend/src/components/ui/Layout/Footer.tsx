import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { Input } from "@/components/form/Input.tsx";
import FooterNav from "./FooterNav.tsx";
import SocialMediaLinks from "./SocialMediaLinks";
import logo from "@/assets/logo.svg";
import MailPlusIconSVG from "@/assets/icons/email-plus.svg?react";
import MailSendingIconSVG from "@/assets/icons/mail-sending.svg?react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-08 text-sm text-white lg:text-base">
      <div className="container flex flex-col space-y-12.5 py-12.5 md:py-8 xl:flex-row xl:gap-20 xl:space-y-0 2xl:py-20">
        <div className="space-y-7">
          <HashLink to="/#hero">
            <img
              src={logo}
              alt="Logo of Estatein, consisting of a purple abstract geometric shape that suggests a dynamic, folded form, set against a black background."
              className="w-[100px]"
            />
          </HashLink>
          <form className="space-y-3 lg:w-[300px]">
            <p className="px-1 text-lg">Subscribe to our news letter!</p>
            <div className="relative">
              <MailPlusIconSVG
                className="absolute left-5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter Email"
                autoComplete="email"
                className="w-full px-12 py-3.5"
              />
              <button aria-label="Subscribe" className="absolute right-5 top-1/2 -translate-y-1/2">
                <MailSendingIconSVG aria-hidden="true" />
                <span className="sr-only">Subscribe To Our News Letter</span>
              </button>
            </div>
          </form>
        </div>
        <FooterNav />
      </div>
      <div className="bg-gray-10 py-5 text-center md:py-3">
        <div className="container flex flex-col md:flex-row md:items-center md:gap-5">
          <SocialMediaLinks />
          <small className="mb-2.5 text-base md:order-1 md:mb-0">
            @{year} Estatein. All Rights Reserved.
          </small>
          <Link to="/" className="md:order-2">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
