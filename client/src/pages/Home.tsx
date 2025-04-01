import { motion } from "framer-motion";
import { useLocation } from "wouter";

const Home = () => {
  const [, setLocation] = useLocation();
  
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setLocation(path);
  };
  
  return (
    <motion.section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Arthur Van Petegem
      </motion.h1>
      
      <motion.div
        className="flex gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.a
          href="/projects"
          className="bg-white text-black px-8 py-3 rounded-lg font-medium text-base hover:bg-gray-200 transition duration-300"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleNavigation('/projects', e)}
        >
          Projects
        </motion.a>
        <motion.a
          href="/contact"
          className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-medium text-base hover:bg-white/10 transition duration-300"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleNavigation('/contact', e)}
        >
          Contact
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Home;
