import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ brandName, links, onGetStarted }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbar, SetNavbar] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      SetNavbar(true);
    } else {
      SetNavbar(false);
    }
  };

  // Set up scroll event listener when component mounts and clean it up when unmounts
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  let navCSS =
    "justify-between p-5 flex shadow-md sticky z-50 top-0 items-center transition-all duration-300";

  return (
    <nav
      className={navCSS.concat(
        navbar
          ? " backdrop-blur-sm bg-white/60" // Apply backdrop blur and semi-transparent background on scroll
          : " backdrop-blur-sm bg-white/50" // Lighter blur and semi-transparent background when navbar is at the top
      )}
    >
      {/* Logo */}
      <div className="ml-5 cursor-default">
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-wider">
          {brandName}
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="space-x-4 relative">
        {links.map((link, index) =>
          link.type === "dropdown" ? (
            <div className="inline-block relative" key={index}>
              <button
                className="px-4 py-2 font-medium text-gray-700 hover:text-white hover:bg-blue-600 rounded-lg transition duration-300"
                onClick={toggleDropdown}
              >
                {link.text} &#x2193;
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-lg rounded-md mt-2 w-40 text-left">
                  {link.subLinks.map((subLink, subIndex) => (
                    <li
                      key={subIndex}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() =>
                        subLink.external
                          ? (window.location.href = subLink.href)
                          : navigate(subLink.href)
                      }
                    >
                      {subLink.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <button
              key={index}
              className="px-4 py-2 font-medium text-gray-700 hover:text-white hover:bg-blue-600 rounded-lg transition duration-300"
              onClick={() =>
                link.external
                  ? (window.location.href = link.href)
                  : navigate(link.href)
              }
            >
              {link.text}
            </button>
          )
        )}
      </div>

      {/* Sign-Up Button */}
      <div className="mr-5">
        <button
          className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


// const links = [
//   { text: "Home", href: "/", external: false },
//   { text: "About", href: "/about", external: false },
//   {
//     text: "Services",
//     type: "dropdown",
//     subLinks: [
//       { text: "Pet Profiles", href: "/profiles", external: false },
//       { text: "Adoption Form", href: "https://example.com", external: true },
//       { text: "Pet Lists", href: "/category", external: false },
//     ],
//   },
//   { text: "Contact Us", href: "/contact", external: false },
// ];

// const handleGetStarted = () => {
//   window.location.href = "https://example.com/get-started";
// };
