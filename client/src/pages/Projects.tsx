import { motion } from "framer-motion";
import BackArrow from "@/components/BackArrow";

const EmptyProjectCard = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div 
      className="project-card bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition duration-300 flex items-center justify-center min-h-[200px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + (delay * 0.1), duration: 0.6 }}
    >
      <p className="text-gray-500 text-center p-6 italic">Coming soon...</p>
    </motion.div>
  );
};

const Projects = () => {
  // Empty array for placeholder boxes
  const emptyProjects = [1, 2, 3, 4, 5, 6];

  return (
    <motion.section 
      id="projects" 
      className="min-h-screen px-4 py-24 md:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackArrow />
          <h2 className="text-3xl font-bold">Projects</h2>
        </motion.div>
        
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <p className="text-gray-400">
            This page is currently under construction.
          </p>
          <p className="text-gray-500 italic">
            Check back later to see my portfolio of projects!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emptyProjects.map((_, index) => (
            <EmptyProjectCard 
              key={index}
              delay={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
