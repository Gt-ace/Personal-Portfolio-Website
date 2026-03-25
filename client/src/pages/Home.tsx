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
          className="relative bg-white text-black px-8 py-3 rounded-lg font-medium text-base overflow-hidden cursor-pointer group"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={(e) => handleNavigation('/projects', e)}
        >
          <span className="relative z-10">Projects</span>
          <motion.div
            className="absolute inset-0 bg-gray-200"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
        <motion.a
          href="/contact"
          className="relative bg-transparent text-white border border-white/60 px-8 py-3 rounded-lg font-medium text-base overflow-hidden cursor-pointer group"
          whileHover={{ y: -3, scale: 1.03, borderColor: "rgba(255,255,255,1)" }}
          whileTap={{ scale: 0.96, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={(e) => handleNavigation('/contact', e)}
        >
          <span className="relative z-10">Contact</span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Home;
