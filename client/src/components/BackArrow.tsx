import { useLocation } from "wouter";
import { motion } from "framer-motion";

const BackArrow = () => {
  const [, setLocation] = useLocation();
  
  return (
    <motion.a 
      href="/"
      className="text-white hover:text-gray-300 mr-4 inline-flex items-center"
      whileHover={{ x: -2 }}
      transition={{ duration: 0.2 }}
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
