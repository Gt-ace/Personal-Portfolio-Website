import { motion } from "framer-motion";
import BackArrow from "@/components/BackArrow";

const ProjectCard = ({ 
  date, 
  title, 
  description, 
  views,
  hasReadMore = false,
  delay = 0
}: { 
  date: string;
  title: string;
  description: string;
  views: number;
  hasReadMore?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div 
      className="project-card bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + (delay * 0.1), duration: 0.6 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">{date}</p>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">{views}</span>
            <i className="fas fa-eye ml-1 text-gray-400 text-sm"></i>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        {hasReadMore && (
          <a href="#" className="text-white hover:text-gray-300 inline-flex items-center">
            Read more <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      date: "Jul 1, 2023",
      title: "unkey.dev",
      description: "Unkey is an open source API key management solution. It allows you to create, manage and validate API Keys for your users. It's built with security and speed in mind.",
      views: 214,
      hasReadMore: true
    },
    {
      date: "Jul 5, 2023",
      title: "planetfall.io",
      description: "I'm building a SaaS providing global latency monitoring for your APIs and websites from edge locations around the world. Have you ever wondered how fast your API is in that part of the world? Planetfall allows you to find out and monitor it continuously.",
      views: 307
    },
    {
      date: "Aug 15, 2023",
      title: "highstorm.app",
      description: "Simple, fast, open source custom event tracking.",
      views: 156
    }
  ];

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
        
        <motion.p 
          className="text-gray-400 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Some of the projects are from work, and some are on my own time.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              date={project.date}
              title={project.title}
              description={project.description}
              views={project.views}
              hasReadMore={project.hasReadMore}
              delay={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
