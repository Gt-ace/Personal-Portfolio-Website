import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

interface Channel {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const channels: Channel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "arthurvanpetegem@outlook.com",
    href: "mailto:arthurvanpetegem@outlook.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Arthur Van Petegem",
    href: "https://www.linkedin.com/in/arthur-van-petegem-7b72b1323/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Gt-ace",
    href: "https://github.com/Gt-ace",
  },
];

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="flex min-h-screen items-center justify-center px-4 py-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-xl">
        <motion.p
          className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Contact
        </motion.p>

        <motion.h1
          className="font-serif text-5xl italic leading-[1.05] text-white sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          Get in touch
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-white/55"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The fastest way to reach me is email. For anything else, I am one
          message away on the channels below.
        </motion.p>

        <div className="mt-12 border-t border-white/[0.08]">
          {channels.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-6 border-b border-white/[0.08] py-6 focus:outline-none focus-visible:bg-white/[0.03]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
              whileTap={{ x: 1 }}
            >
              <div className="flex items-center gap-5">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/90">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-white/40">
                    {label}
                  </span>
                  <span className="mt-0.5 block break-all text-lg text-white/85 transition-colors duration-200 group-hover:text-white">
                    {value}
                  </span>
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 flex-none text-white/25 transition-all duration-200 group-hover:text-white/80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
