import { Link } from "wouter";
import { motion } from "framer-motion";

const BackArrow = () => {
  return (
    <Link href="/">
      <motion.a 
        className="text-white hover:text-gray-300 mr-4 inline-flex items-center"
        whileHover={{ x: -2 }}
        transition={{ duration: 0.2 }}
      >
        <i className="fas fa-arrow-left text-sm"></i>
      </motion.a>
    </Link>
  );
};

export default BackArrow;
