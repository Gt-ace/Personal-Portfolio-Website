import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const Navbar = () => {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState("home");

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

  const links = [
    { page: "home", path: "/", label: "Home" },
    { page: "projects", path: "/projects", label: "Projects" },
    { page: "contact", path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 right-0 z-50 flex items-center gap-1 p-6 text-sm md:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {links.map(({ page, path, label }) => (
        <motion.a
          key={page}
          href={path}
          className={`relative px-3 py-1.5 rounded-md cursor-pointer transition-colors duration-200 ${
            currentPage === page
              ? "text-white font-medium"
              : "text-gray-400 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(page, path);
          }}
        >
          {currentPage === page && (
            <motion.div
              className="absolute inset-0 bg-white/[0.08] rounded-md"
              layoutId="nav-active"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </motion.a>
      ))}
    </motion.nav>
  );
};

export default Navbar;
