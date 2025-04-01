import { motion } from "framer-motion";

const Home = () => {
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
        className="text-4xl md:text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Arthur Van Petegem
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-300 max-w-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        I&apos;m building websites to solve API authentication and automation for developers.
      </motion.p>
    </motion.section>
  );
};

export default Home;
