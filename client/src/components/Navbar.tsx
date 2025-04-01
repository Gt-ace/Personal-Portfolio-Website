import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const Navbar = () => {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState("home");

  // Check current page on mount and when location changes
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") {
      setCurrentPage("home");
    } else if (path === "/projects") {
      setCurrentPage("projects");
    } else if (path === "/contact") {
      setCurrentPage("contact");
    }
  }, []);

  const handleNavClick = (page: string, path: string) => {
    setCurrentPage(page);
    setLocation(path);
  };

  return (
    <motion.nav 
      className="fixed top-0 right-0 z-50 flex items-center gap-6 p-6 text-sm md:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <Link href="/">
        <a 
          className={`text-white hover:text-gray-300 transition duration-300 ${currentPage === "home" ? "font-medium" : ""}`}
          onClick={() => handleNavClick("home", "/")}
        >
          Home
        </a>
      </Link>
      <Link href="/projects">
        <a 
          className={`text-white hover:text-gray-300 transition duration-300 ${currentPage === "projects" ? "font-medium" : ""}`}
          onClick={() => handleNavClick("projects", "/projects")}
        >
          Projects
        </a>
      </Link>
      <Link href="/contact">
        <a 
          className={`text-white hover:text-gray-300 transition duration-300 ${currentPage === "contact" ? "font-medium" : ""}`}
          onClick={() => handleNavClick("contact", "/contact")}
        >
          Contact
        </a>
      </Link>
    </motion.nav>
  );
};

export default Navbar;
