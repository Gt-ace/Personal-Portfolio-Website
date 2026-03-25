import { motion } from "framer-motion";
import BackArrow from "@/components/BackArrow";

const ContactItem = ({
  icon,
  platform,
  username,
  href,
  delay = 0,
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
      className="contact-item relative bg-[#161616] flex flex-col items-center justify-center p-12 rounded-xl border border-white/[0.06] h-[250px] cursor-pointer overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3 + delay * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        borderColor: "rgba(255,255,255,0.15)",
      }}
      whileTap={{ scale: 0.98, y: -2 }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <motion.div
        className="icon-container relative p-5 mb-5 rounded-full bg-white/[0.05] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-300"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <i className={`${icon} text-2xl`}></i>
      </motion.div>
      <p className="relative text-center font-medium mb-3 text-lg">{platform}</p>
      <p className="relative text-gray-400 text-base text-center break-all group-hover:text-gray-300 transition-colors duration-300">
        {username}
      </p>
    </motion.a>
  );
};

const Contact = () => {
  const contactItems = [
    {
      icon: "fab fa-linkedin",
      platform: "LinkedIn",
      username: "Arthur Van Petegem",
      href: "https://www.linkedin.com/in/arthur-van-petegem-7b72b1323/",
    },
    {
      icon: "fas fa-envelope",
      platform: "Email",
      username: "arthurvanpetegem@outlook.com",
      href: "mailto:arthurvanpetegem@outlook.com",
    },
    {
      icon: "fab fa-github",
      platform: "GitHub",
      username: "Gt-ace",
      href: "https://github.com/Gt-ace",
    },
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
