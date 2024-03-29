import { HashLink } from "react-router-hash-link";
import FooterLinks from "./FooterLinks";

export default function FooterNav() {
  return (
    <nav className="grid grid-cols-2 grid-rows-11 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-x-10 lg:grid-cols-5 lg:grid-rows-1 lg:gap-5 xl:m-0 2xl:flex 2xl:gap-20">
      <FooterLinks pageName="Home" className="row-span-5 md:order-1">
        <HashLink to="/#hero">Home</HashLink>
        <HashLink to="/#hero">Hero Section</HashLink>
        <HashLink to="/#featured-properties">Featured Properties</HashLink>
        <HashLink to="/#testimonials">Testimonials</HashLink>
        <HashLink to="/#faqs">FAQ's</HashLink>
      </FooterLinks>
      <FooterLinks pageName="About Us" className="row-span-5 md:order-2">
        <HashLink to="/about">About Us</HashLink>
        <HashLink to="/about#story">Our Story</HashLink>
        <HashLink to="/about#work">Our Works</HashLink>
        <HashLink to="/about#how-it-is-work">How It Is Works</HashLink>
        <HashLink to="/about#team">Our Team</HashLink>
        <HashLink to="/about#clients">Our Clients</HashLink>
      </FooterLinks>
      <FooterLinks pageName="Properties" className="row-span-3 md:order-4">
        <HashLink to="/properties">Properties</HashLink>
        <HashLink to="/properties#portfolio">Portfolio</HashLink>
        <HashLink to="/properties#catagories">Catagories</HashLink>
      </FooterLinks>
      <FooterLinks pageName="Services" className="row-span-5 md:order-3">
        <HashLink to="/services">Services</HashLink>
        <HashLink to="/services#valuation">Valuation Mastery</HashLink>
        <HashLink to="/services#marketing">Strategic Marketing</HashLink>
        <HashLink to="/services#negotiation">Negotiation Wizardry</HashLink>
        <HashLink to="/services#closing-success">Closing Success</HashLink>
        <HashLink to="/services#property-management">Property Management</HashLink>
      </FooterLinks>
      <FooterLinks pageName="Contact Us" className="row-span-3 md:order-5">
        <HashLink to="/contact">Contact Us</HashLink>
        <HashLink to="/contact#contact">Contact Form</HashLink>
        <HashLink to="/contact#offices">Our Offices</HashLink>
      </FooterLinks>
    </nav>
  );
}
