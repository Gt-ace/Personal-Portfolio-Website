import { useLocation } from "wouter";
import { motion } from "framer-motion";

const BackArrow = () => {
  const [, setLocation] = useLocation();

  return (
    <motion.a
      href="/"
      className="text-white hover:text-gray-300 mr-4 inline-flex items-center cursor-pointer"
      whileHover={{ x: -4, scale: 1.1 }}
      whileTap={{ scale: 0.9, x: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={(e) => {
        e.preventDefault();
        setLocation("/");
      }}
    >
      <i className="fas fa-arrow-left text-sm"></i>
    </motion.a>
  );
};

export default BackArrow;
