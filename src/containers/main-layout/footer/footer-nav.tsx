import Link from "next/link";
import { FooterLinks } from "./footer-links";

export function FooterNav() {
  return (
    <nav className="grid grid-cols-2 grid-rows-10 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-10 lg:grid-cols-5 lg:grid-rows-1 lg:gap-5 xl:m-0 xl:flex xl:flex-grow xl:justify-between">
      <FooterLinks
        pageName="Home"
        className="row-span-4 md:order-1 md:row-span-5"
      >
        <Link href="/#">Home</Link>
        <Link href="/#hero">Hero Section</Link>
        <Link href="/#featured-properties">Featured Properties</Link>
        <Link href="/#testimonials">Testimonials</Link>
        <Link href="/#faqs">FAQ's</Link>
      </FooterLinks>
      <FooterLinks pageName="About Us" className="row-span-5 md:order-2">
        <Link href="/about#">About Us</Link>
        <Link href="/about#hero">Our Story</Link>
        <Link href="/about#our-values">Our Values</Link>
        <Link href="/about#our-achievements">Our Achievements</Link>
        <Link href="/about#how-it-is-work">How It Is Works</Link>
        <Link href="/about#team">Our Team</Link>
        <Link href="/about#clients">Our Clients</Link>
      </FooterLinks>
      <FooterLinks pageName="Properties" className="row-span-3 md:order-4">
        <Link href="/properties#">Properties</Link>
        <Link href="/properties#portfolio">Portfolio</Link>
        <Link href="/properties#contact">Contact</Link>
      </FooterLinks>
      <FooterLinks pageName="Services" className="row-span-5 md:order-3">
        <Link href="/services#">Services</Link>
        <Link href="/services#valuation">Valuation</Link>
        <Link href="/services#property-management">Property Management</Link>
        <Link href="/services#investments">Investments</Link>
      </FooterLinks>
      <FooterLinks pageName="Contact Us" className="row-span-3 md:order-5">
        <Link href="/contact#">Contact Us</Link>
        <Link href="/contact#contact">Contact Form</Link>
        <Link href="/contact#offices">Our Offices</Link>
      </FooterLinks>
    </nav>
  );
}
