import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/hero";
import Features from "../components/featured";
import CTA from "../components/CTA";

const Home = () => {

  const links = [
    { text: "Home", href: "/", external: false },
    { text: "About", href: "/about", external: false },
    {
      text: "Services",
      type: "dropdown",
      subLinks: [
        { text: "Pet Profiles", href: "/profiles", external: false },
        { text: "Adoption Form", href: "https://example.com", external: true },
        { text: "Pet Lists", href: "/category", external: false },
      ],
    },
    { text: "Contact Us", href: "/contact", external: false },
  ];
  
  const handleGetStarted = () => {
    window.location.href = "https://example.com/get-started";
  };

  const name = 'StartUp AI'

  const socialLinks = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/petofyindia/",
    icon: "https://example.com/instagram-icn.svg",
    external: true,
  },
  {
    label: "Twitter",
    url: "https://x.com/petofyindia",
    icon: "https://example.com/twitter-icon.svg",
    external: true,
  },
];

const aboutLinks = [
  { label: "Our Mission", url: "/mission", external: false },
  { label: "Careers", url: "/careers", external: false },
  { label: "Privacy Policy", url: "/privacy", external: false },
];

const contactLinks = [
  { label: "Contact Support", url: "/support", external: false },
  { label: "Email Us", url: "mailto:support@pawfect.com", external: true },
  { label: "Location", url: "/location", external: false },
];
  return (
    <div>
      <Navbar links={links} brandName={name} onGetStarted={handleGetStarted}/>
      <Hero></Hero>
      <Features></Features>
      <CTA></CTA>
      <Footer aboutLinks={aboutLinks} contactLinks={contactLinks} links={socialLinks} tagline="TAGLINE HERE PLEASE !!" title={name} />
    </div>
  );
};

export default Home;
