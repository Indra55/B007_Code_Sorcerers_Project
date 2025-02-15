import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = ({
  title = "Pawfect",
  tagline = "Bringing Paws and Hearts Together - Find Your Pawfect Companion Today!",
  backgroundImage,
  links = [],
  aboutLinks = [],
  contactLinks = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="m-5 bg-slate-200"
    >
      <div className="p-10 rounded-lg flex justify-between inset-0">
        <div>
          <p className="text-3xl font-bold font-serif">{title}</p>
          <p className="mt-4 text-black/70 text-xl font-semibold">{tagline}</p>
          {/* Social Links Section */}
          <div className="flex gap-3 justify-start">
            <div className="flex gap-4 mt-4">
              {links.map((link, index) => (
                <button
                  key={index}
                  className="mt-6 bg-black/40 rounded-full hover:scale-105 hover:bg-red-300 hover:-translate-y-8 transition p-2 duration-500"
                  onClick={() =>
                    link.external
                      ? (window.location.href = link.url)
                      : handleNavigation(link.url)
                  }
                >
                  <img src={link.icon} alt={link.label} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
          <p className="mt-5">
            copyright &copy; {title} All rights reserved. Present by Code
            Sorcerers
          </p>
        </div>

        {/* About Us Section */}
        <div className="">
          <h2 className="font-semibold text-lg">About Us</h2>
          <ul className="mt-5 text-lg space-y-5">
            {aboutLinks.map((link, index) => (
              <li key={index} className="text-gray-700 hover:text-black">
                <button
                  onClick={() =>
                    link.external
                      ? (window.location.href = link.url)
                      : handleNavigation(link.url)
                  }
                  className="hover:text-blue-500 transition duration-300"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="">
          <h2 className="font-semibold text-lg">Contact Us</h2>
          <ul className="mt-5 text-lg space-y-5">
            {contactLinks.map((link, index) => (
              <li key={index} className="text-gray-700 hover:text-black">
                <button
                  onClick={() =>
                    link.external
                      ? (window.location.href = link.url)
                      : handleNavigation(link.url)
                  }
                  className="hover:text-blue-500 transition duration-300"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Default Props
Footer.defaultProps = {
  backgroundImage:
    "https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// Prop Types for validation
Footer.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  backgroundImage: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      external: PropTypes.bool, // true if it’s an external link
    })
  ),
  aboutLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      external: PropTypes.bool,
    })
  ),
  contactLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      external: PropTypes.bool,
    })
  ),
};

export default Footer;

// const socialLinks = [
//   {
//     label: "Instagram",
//     url: "https://www.instagram.com/petofyindia/",
//     icon: "https://example.com/instagram-icn.svg",
//     external: true,
//   },
//   {
//     label: "Twitter",
//     url: "https://x.com/petofyindia",
//     icon: "https://example.com/twitter-icon.svg",
//     external: true,
//   },
// ];

// const aboutLinks = [
//   { label: "Our Mission", url: "/mission", external: false },
//   { label: "Careers", url: "/careers", external: false },
//   { label: "Privacy Policy", url: "/privacy", external: false },
// ];

// const contactLinks = [
//   { label: "Contact Support", url: "/support", external: false },
//   { label: "Email Us", url: "mailto:support@pawfect.com", external: true },
//   { label: "Location", url: "/location", external: false },
// ];
