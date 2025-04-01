import { motion } from "framer-motion";
import BackArrow from "@/components/BackArrow";

const ContactItem = ({ 
  icon, 
  platform, 
  username, 
  href,
  delay = 0
}: { 
  icon: string;
  platform: string;
  username: string;
  href: string;
  delay?: number;
}) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="contact-item bg-[#1a1a1a] flex flex-col items-center justify-center p-12 rounded-lg border border-gray-800 hover:border-gray-700 transition duration-300 h-[250px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + (delay * 0.1), duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="icon-container p-5 mb-5 rounded-full bg-gray-800">
        <i className={`${icon} text-2xl`}></i>
      </div>
      <p className="text-center font-medium mb-3 text-lg">{platform}</p>
      <p className="text-gray-400 text-base text-center break-all">{username}</p>
    </motion.a>
  );
};

const Contact = () => {
  const contactItems = [
    {
      icon: "fab fa-linkedin",
      platform: "LinkedIn",
      username: "Arthur Van Petegem",
      href: "https://www.linkedin.com/in/arthur-van-petegem-7b72b1323/"
    },
    {
      icon: "fas fa-envelope",
      platform: "Email",
      username: "arthurvanpetegem@outlook.com",
      href: "mailto:arthurvanpetegem@outlook.com"
    },
    {
      icon: "fab fa-github",
      platform: "GitHub",
      username: "Gt-ace",
      href: "https://github.com/Gt-ace"
    }
  ];

  return (
    <motion.section 
      id="contact" 
      className="min-h-screen px-4 py-24 md:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackArrow />
          <h2 className="text-3xl font-bold">Contact</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactItems.map((item, index) => (
            <ContactItem 
              key={index}
              icon={item.icon}
              platform={item.platform}
              username={item.username}
              href={item.href}
              delay={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
